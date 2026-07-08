#!/usr/bin/env python3
"""
Upload local images to get public URLs for use as references in image generation.
Supports imgbb for temporary/permanent hosting.
"""

import argparse
import base64
import os
import sys

import requests
from dotenv import load_dotenv

load_dotenv()

IMGBB_API_KEY = os.getenv("IMGBB_API_KEY", "")


def upload_to_imgbb(file_path, expiration=None):
    """
    Upload an image to imgbb and return the public URL.

    Args:
        file_path: Path to the local image file
        expiration: Optional expiration in seconds (None = never expire)

    Returns:
        Public URL of the uploaded image
    """
    if not IMGBB_API_KEY:
        raise ValueError(
            "IMGBB_API_KEY not set in .env file. "
            "Get your free API key at https://api.imgbb.com/"
        )

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Image file not found: {file_path}")

    with open(file_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode("utf-8")

    payload = {
        "key": IMGBB_API_KEY,
        "image": image_data,
        "name": os.path.splitext(os.path.basename(file_path))[0],
    }

    if expiration:
        payload["expiration"] = expiration

    response = requests.post(
        "https://api.imgbb.com/1/upload",
        data=payload,
        timeout=60,
    )
    response.raise_for_status()
    data = response.json()

    if not data.get("success"):
        raise RuntimeError(f"imgbb upload failed: {data}")

    image_url = data["data"]["url"]
    print(f"Image uploaded successfully: {image_url}")
    return image_url


def upload_to_fal(file_path):
    """
    Upload an image to fal.ai storage and return the public URL.
    Requires FAL_KEY to be set.
    """
    fal_key = os.getenv("FAL_KEY", "")
    if not fal_key:
        raise ValueError("FAL_KEY not set in .env file")

    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Image file not found: {file_path}")

    content_type = "image/png"
    if file_path.lower().endswith(".jpg") or file_path.lower().endswith(".jpeg"):
        content_type = "image/jpeg"
    elif file_path.lower().endswith(".webp"):
        content_type = "image/webp"

    # Get upload URL
    headers = {
        "Authorization": f"Key {fal_key}",
        "Content-Type": "application/json",
    }

    init_response = requests.post(
        "https://fal.run/fal-ai/file-upload/initiate",
        headers=headers,
        json={
            "file_name": os.path.basename(file_path),
            "content_type": content_type,
        },
        timeout=30,
    )
    init_response.raise_for_status()
    init_data = init_response.json()

    upload_url = init_data["upload_url"]
    file_url = init_data["file_url"]

    # Upload the file
    with open(file_path, "rb") as f:
        upload_response = requests.put(
            upload_url,
            data=f.read(),
            headers={"Content-Type": content_type},
            timeout=120,
        )
        upload_response.raise_for_status()

    print(f"Image uploaded to fal.ai: {file_url}")
    return file_url


def upload_image(file_path, provider="imgbb", expiration=None):
    """Upload an image using the specified provider."""
    if provider == "fal":
        return upload_to_fal(file_path)
    else:
        return upload_to_imgbb(file_path, expiration)


def main():
    parser = argparse.ArgumentParser(description="Upload images to get public URLs")
    parser.add_argument("--file", type=str, required=True,
                        help="Path to the image file to upload")
    parser.add_argument("--provider", type=str, default="imgbb",
                        choices=["imgbb", "fal"],
                        help="Upload provider (default: imgbb)")
    parser.add_argument("--expiration", type=int, default=None,
                        help="Expiration in seconds (imgbb only, None = permanent)")

    args = parser.parse_args()

    try:
        url = upload_image(args.file, args.provider, args.expiration)
        print(f"PUBLIC_URL={url}")
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
