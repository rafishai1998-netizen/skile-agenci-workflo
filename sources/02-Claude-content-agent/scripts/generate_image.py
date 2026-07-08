#!/usr/bin/env python3
"""
Image generation script using kie.ai or fal.ai APIs with Nano Banana Pro model.
Supports text-to-image and image-to-image generation.
"""

import argparse
import json
import os
import sys
import time

import requests
from dotenv import load_dotenv

load_dotenv()

# ─── Configuration ───────────────────────────────────────────────────────────

IMAGE_PROVIDER = os.getenv("IMAGE_PROVIDER", "kie").lower()
IMAGE_MODEL = os.getenv("IMAGE_MODEL", "nano-banana-pro")

# kie.ai config
KIE_API_KEY = os.getenv("KIE_API_KEY", "")
KIE_BASE_URL = "https://api.kie.ai/api/v1"

# fal.ai config
FAL_KEY = os.getenv("FAL_KEY", "")
FAL_BASE_URL = "https://queue.fal.run"


# ─── kie.ai Provider ────────────────────────────────────────────────────────

def kie_create_task(prompt, aspect_ratio="1:1", reference_urls=None, output_format="png"):
    """Create an image generation task on kie.ai."""
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {KIE_API_KEY}",
    }

    payload = {
        "model": IMAGE_MODEL,
        "input": {
            "prompt": prompt,
            "aspect_ratio": aspect_ratio,
            "output_format": output_format,
        },
    }

    if reference_urls:
        payload["input"]["image_input"] = reference_urls

    response = requests.post(
        f"{KIE_BASE_URL}/jobs/createTask",
        headers=headers,
        json=payload,
        timeout=30,
    )
    response.raise_for_status()
    data = response.json()

    if data.get("code") != 200:
        raise RuntimeError(f"kie.ai createTask failed: {data}")

    task_id = data["data"]["taskId"]
    print(f"[kie.ai] Task created: {task_id}")
    return task_id


def kie_poll_result(task_id, max_attempts=120, interval=5):
    """Poll kie.ai for task completion and return the result URLs."""
    headers = {"Authorization": f"Bearer {KIE_API_KEY}"}

    for attempt in range(1, max_attempts + 1):
        response = requests.get(
            f"{KIE_BASE_URL}/jobs/recordInfo",
            headers=headers,
            params={"taskId": task_id},
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()

        state = data.get("data", {}).get("state", "unknown")
        print(f"[kie.ai] Poll attempt {attempt}: state={state}")

        if state == "success":
            result_json = json.loads(data["data"]["resultJson"])
            return result_json.get("resultUrls", [])

        if state == "fail":
            fail_msg = data["data"].get("failMsg", "Unknown error")
            raise RuntimeError(f"[kie.ai] Task failed: {fail_msg}")

        time.sleep(interval)

    raise TimeoutError(f"[kie.ai] Task {task_id} timed out after {max_attempts * interval}s")


def kie_generate(prompt, aspect_ratio="1:1", reference_urls=None, output_format="png"):
    """Generate an image using kie.ai and return the result URLs."""
    task_id = kie_create_task(prompt, aspect_ratio, reference_urls, output_format)
    return kie_poll_result(task_id)


# ─── fal.ai Provider ────────────────────────────────────────────────────────

def fal_generate(prompt, aspect_ratio="1:1", reference_urls=None, output_format="png"):
    """Generate an image using fal.ai and return the result URLs."""
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Key {FAL_KEY}",
    }

    model_endpoint = f"fal-ai/{IMAGE_MODEL}"
    if reference_urls:
        model_endpoint += "/edit"

    arguments = {
        "prompt": prompt,
        "num_images": 1,
        "aspect_ratio": aspect_ratio,
        "output_format": output_format,
    }

    if reference_urls:
        arguments["image_url"] = reference_urls[0]

    # Submit to queue
    response = requests.post(
        f"{FAL_BASE_URL}/{model_endpoint}",
        headers=headers,
        json=arguments,
        timeout=30,
    )
    response.raise_for_status()
    data = response.json()

    # If synchronous response with images
    if "images" in data:
        return [img["url"] for img in data["images"]]

    # If queued, poll for result
    request_id = data.get("request_id")
    if request_id:
        return fal_poll_result(model_endpoint, request_id, headers)

    raise RuntimeError(f"[fal.ai] Unexpected response: {data}")


def fal_poll_result(model_endpoint, request_id, headers, max_attempts=120, interval=5):
    """Poll fal.ai for task completion."""
    status_url = f"https://queue.fal.run/{model_endpoint}/requests/{request_id}/status"
    result_url = f"https://queue.fal.run/{model_endpoint}/requests/{request_id}"

    for attempt in range(1, max_attempts + 1):
        response = requests.get(status_url, headers=headers, timeout=30)
        response.raise_for_status()
        data = response.json()

        status = data.get("status", "unknown")
        print(f"[fal.ai] Poll attempt {attempt}: status={status}")

        if status == "COMPLETED":
            result_response = requests.get(result_url, headers=headers, timeout=30)
            result_response.raise_for_status()
            result_data = result_response.json()
            return [img["url"] for img in result_data.get("images", [])]

        if status in ("FAILED", "CANCELLED"):
            raise RuntimeError(f"[fal.ai] Task failed: {data}")

        time.sleep(interval)

    raise TimeoutError(f"[fal.ai] Task {request_id} timed out")


# ─── Unified Interface ──────────────────────────────────────────────────────

def generate_image(prompt, aspect_ratio="1:1", reference_urls=None, output_format="png"):
    """Generate an image using the configured provider."""
    if IMAGE_PROVIDER == "fal":
        if not FAL_KEY:
            raise ValueError("FAL_KEY not set in .env file")
        return fal_generate(prompt, aspect_ratio, reference_urls, output_format)
    else:
        if not KIE_API_KEY:
            raise ValueError("KIE_API_KEY not set in .env file")
        return kie_generate(prompt, aspect_ratio, reference_urls, output_format)


def download_image(url, output_path):
    """Download an image from URL and save to local path."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    response = requests.get(url, timeout=60, stream=True)
    response.raise_for_status()

    with open(output_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    print(f"Image saved to: {output_path}")
    return output_path


def test_connection():
    """Test API connectivity without generating an image."""
    print(f"Provider: {IMAGE_PROVIDER}")
    print(f"Model: {IMAGE_MODEL}")

    if IMAGE_PROVIDER == "fal":
        if not FAL_KEY:
            print("ERROR: FAL_KEY not set in .env file")
            return False
        print(f"FAL_KEY: {FAL_KEY[:8]}...{FAL_KEY[-4:]}")
        print("fal.ai connection configured.")
        return True
    else:
        if not KIE_API_KEY:
            print("ERROR: KIE_API_KEY not set in .env file")
            return False
        print(f"KIE_API_KEY: {KIE_API_KEY[:8]}...{KIE_API_KEY[-4:]}")
        print("kie.ai connection configured.")
        return True


# ─── CLI Interface ───────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Generate images using Nano Banana Pro API")
    parser.add_argument("--prompt", type=str, help="Image generation prompt")
    parser.add_argument("--aspect-ratio", type=str, default="1:1",
                        help="Aspect ratio (e.g., 1:1, 16:9, 4:5, 9:16)")
    parser.add_argument("--output", type=str, default="output.png",
                        help="Output file path")
    parser.add_argument("--reference-url", type=str,
                        help="Reference image URL for image-to-image generation")
    parser.add_argument("--additional-refs", type=str,
                        help="Comma-separated additional reference image URLs")
    parser.add_argument("--format", type=str, default="png",
                        choices=["png", "jpeg", "webp"],
                        help="Output image format")
    parser.add_argument("--test", action="store_true",
                        help="Test API connection without generating")

    args = parser.parse_args()

    if args.test:
        success = test_connection()
        sys.exit(0 if success else 1)

    if not args.prompt:
        parser.error("--prompt is required for image generation")

    # Build reference URLs list
    reference_urls = None
    if args.reference_url:
        reference_urls = [args.reference_url]
        if args.additional_refs:
            reference_urls.extend(args.additional_refs.split(","))

    try:
        print(f"Generating image with {IMAGE_PROVIDER} ({IMAGE_MODEL})...")
        print(f"Prompt: {args.prompt[:100]}...")
        print(f"Aspect ratio: {args.aspect_ratio}")

        result_urls = generate_image(
            prompt=args.prompt,
            aspect_ratio=args.aspect_ratio,
            reference_urls=reference_urls,
            output_format=args.format,
        )

        if result_urls:
            image_url = result_urls[0]
            print(f"Generation complete. URL: {image_url}")
            download_image(image_url, args.output)
            print(f"SUCCESS: Image saved to {args.output}")
        else:
            print("ERROR: No images returned from API")
            sys.exit(1)

    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
