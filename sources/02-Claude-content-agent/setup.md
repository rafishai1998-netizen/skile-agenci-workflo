# Claude Creatives — Setup Guide

This document guides Claude through the complete setup process for the Claude Creatives system.

## Setup Checklist

When the user asks to set up the system, follow this checklist step by step:

### Phase 1: System Requirements

- [ ] **Python 3.10+** — Check with `python3 --version`. Install if missing.
- [ ] **pip** — Check with `pip3 --version`. Install if missing.
- [ ] **Chrome/Chromium** — Required for PDF generation. Check with `google-chrome --version` or `chromium --version`.
- [ ] **ffmpeg** — Optional, useful for video thumbnail extraction. Check with `ffmpeg -version`.

### Phase 2: Install Python Dependencies

Run the following command from the project root:

```bash
pip3 install -r requirements.txt
```

This installs:
- `requests` — HTTP client for API calls
- `python-dotenv` — Environment variable management
- `Pillow` — Image processing
- `weasyprint` — HTML to PDF conversion
- `jinja2` — HTML templating for documents

### Phase 3: Configure API Keys

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and configure the following:

#### Required: Image Generation API Key

The system uses **kie.ai** by default for image generation via the Nano Banana Pro model.

**To get your kie.ai API key:**
1. Go to [kie.ai](https://kie.ai/) and create an account
2. Navigate to the **Billing** section and add credits ($5 minimum package available)
3. Go to **API Keys** section
4. Copy the default API key or create a new one
5. Paste it as `KIE_API_KEY` in your `.env` file

**Alternative: fal.ai**
If you prefer fal.ai:
1. Go to [fal.ai](https://fal.ai/) and create an account
2. Navigate to [Dashboard > Keys](https://fal.ai/dashboard/keys)
3. Create a new API key
4. Set `FAL_KEY` in `.env` and change `IMAGE_PROVIDER=fal`

#### Optional: Image Upload API Key (for thumbnails with face references)

To use face references or custom images in thumbnails, you need an image hosting API:

1. Go to [imgbb.com](https://imgbb.com/) and create an account
2. Go to [api.imgbb.com](https://api.imgbb.com/) to get your API key
3. Paste it as `IMGBB_API_KEY` in your `.env` file

#### Optional: Late API Key (Phase 3 — Social Media Manager)

This is only needed if you want to connect the system to the EX AI Agent Social Media Manager for automated posting. Skip this during initial setup.

### Phase 4: Verify Project Structure

Confirm the following folders exist:
- `claude/skills/carousel-generator/`
- `claude/skills/thumbnail-creator/assets/`
- `claude/skills/document-carousel/`
- `images/references/`
- `images/logos/`
- `outputs/carousels/`
- `outputs/thumbnails/`
- `outputs/documents/`
- `scripts/`
- `styles/`

### Phase 5: Test Setup

Run a quick test to verify the setup:

```bash
python3 scripts/generate_image.py --test
```

This will verify:
- API key is configured correctly
- API endpoint is reachable
- Image generation returns a valid response

## Setup Status

After completing all phases, report the following to the user:

```
✅ Setup Status: SYSTEM READY

Completed:
- [x] Python & pip installed
- [x] Dependencies installed
- [x] API keys configured
- [x] Project structure verified
- [x] Setup test passed

Available Skills:
1. 🎨 Thumbnail Creator — Create YouTube/video thumbnails
2. 🖼️ Carousel Generator — Create multi-slide image carousels
3. 📄 Document Carousel — Create educational PDF documents

Next Steps:
- Add your face PNG to claude/skills/thumbnail-creator/assets/
- Add your brand logo to images/logos/
- Add style reference images to images/references/
- Start creating! Ask me to use any of the three skills.
```

## Troubleshooting

### WeasyPrint Installation Issues
If `weasyprint` fails to install, it may need system-level dependencies:
- **Ubuntu/Debian**: `sudo apt-get install -y libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev libcairo2`
- **macOS**: `brew install pango libffi cairo gdk-pixbuf`

### Chrome Not Found
For PDF generation, install Chrome:
- **Ubuntu/Debian**: `sudo apt-get install -y google-chrome-stable` or `sudo apt-get install -y chromium-browser`
- **macOS**: Download from [google.com/chrome](https://www.google.com/chrome/)

### API Key Issues
- Verify your key is correct in `.env`
- Ensure you have credits/balance in your kie.ai or fal.ai account
- Test with: `python3 scripts/generate_image.py --test`
