# Thumbnail Creator Skill

Generate attention-grabbing thumbnails for YouTube videos and other long-form content, including face references and brand elements.

## Workflow Overview

This skill follows a **5-phase workflow**:

1. **Gather** — Collect concept, references, and face/brand assets
2. **Compose** — Design the thumbnail composition and generate prompts
3. **Generate** — Create the thumbnail via Nano Banana Pro API
4. **Review** — Present results for user approval
5. **Evolve** — Iterate and refine based on feedback

---

## Phase 1: Gather

Collect the following from the user:

### Required Information
- **Video title/topic**: What is the video about?
- **Thumbnail concept**: What should the thumbnail convey? What emotion/reaction?
- **Key text**: Any text overlays for the thumbnail (keep it short — 3-5 words max)
- **Target platform**: YouTube (1280x720, 16:9), or other

### Face Reference
- **Face image**: Check `claude/skills/thumbnail-creator/assets/` for existing face PNGs
- If no face image exists, ask the user to:
  1. Place their face PNG (transparent background preferred) in `claude/skills/thumbnail-creator/assets/`
  2. Provide the path to their face image
- **Face placement**: Where should the face appear? (left, right, center, specific position)
- **Face expression/pose**: Smiling, surprised, pointing, looking at something, etc.

### Brand Elements
- **Logo**: Check `images/logos/` for brand logos
- **Brand colors**: Primary and accent colors
- **Brand elements**: Any specific icons, graphics, or recurring visual elements

### Style Preferences
- **Reference thumbnails**: Does the user have examples of thumbnails they like?
- **Visual style**: Cinematic, bold, clean, energetic, tech, minimal
- **Color mood**: Warm, cool, vibrant, dark, neon
- **Background type**: Gradient, solid, scene-based, abstract

### Additional Images
- **Supporting images**: Any other images to include (product screenshots, logos, icons)
- Store paths to all reference images

---

## Phase 2: Compose

Design the thumbnail composition and generate the image prompt.

### Thumbnail Design Principles

1. **Hierarchy**: Main subject (face) should be the focal point
2. **Contrast**: Text must be readable against the background
3. **Simplicity**: Don't overcrowd — 1-2 key visual elements + face + text
4. **Emotion**: Face expressions drive clicks — surprise, excitement, curiosity
5. **Color pop**: Use contrasting/complementary colors for visual impact
6. **Text size**: Large, bold text that's readable at small sizes (mobile)

### Composition Templates

**Template A: Face + Text (Classic YouTube)**
- Face on one side (40% of frame)
- Bold text on the other side
- Gradient or solid background
- Brand accent colors

**Template B: Face + Visual Element**
- Face prominently placed
- Supporting visual element (product, logo, screenshot)
- Minimal text overlay
- Dynamic background

**Template C: Scene-Based**
- Face integrated into a scene/environment
- Text overlay with contrast background
- Atmospheric lighting and mood

### Prompt Engineering for Thumbnails

Create a detailed prompt that specifies:

```
Create a YouTube thumbnail (1280x720, 16:9 aspect ratio).

Subject: [person description] with [expression] expression, positioned [placement]
Background: [background description with colors]
Text overlay: "[text]" in [font style], [color], positioned [location]
Additional elements: [logos, icons, graphics]
Style: [visual style] with [color mood] tones
Lighting: [lighting description]
Brand colors: [primary] and [accent]
Composition: [describe the overall layout and visual hierarchy]
```

### Image-to-Image for Face References

When using a face reference:
1. Upload the face image to get a public URL:
   ```bash
   python3 scripts/upload_image.py --file "claude/skills/thumbnail-creator/assets/<face>.png"
   ```
2. Upload any additional reference images similarly
3. Include all uploaded URLs in the generation request as reference images

Present the final prompt and composition plan to the user for approval.

---

## Phase 3: Generate

Execute thumbnail generation.

### Generation Process

1. **Upload reference images** (face, logos, additional elements):
   ```bash
   python3 scripts/upload_image.py --file "<path_to_image>"
   ```
   Save the returned URLs for use in generation.

2. **Cost estimate**: Present cost (~$0.09-$0.15 per image on kie.ai)

3. **Generate thumbnail**:
   ```bash
   # Text-to-image (no face reference)
   python3 scripts/generate_image.py \
     --prompt "<thumbnail_prompt>" \
     --aspect-ratio "16:9" \
     --output "outputs/thumbnails/<project-name>/thumbnail.png"

   # Image-to-image (with face/element references)
   python3 scripts/generate_image.py \
     --prompt "<thumbnail_prompt>" \
     --aspect-ratio "16:9" \
     --reference-url "<face_url>" \
     --additional-refs "<logo_url>,<element_url>" \
     --output "outputs/thumbnails/<project-name>/thumbnail.png"
   ```

4. **Generate variations** (recommended): Create 2-3 variations for the user to choose from

### Output Organization

```
outputs/thumbnails/<project-name>/
├── thumbnail_v1.png
├── thumbnail_v2.png (variation)
├── thumbnail_v3.png (variation)
└── prompts.md
```

---

## Phase 4: Review

Present the generated thumbnail(s) to the user.

### Review Checklist
- Does the face look natural and well-integrated?
- Is the text readable at small sizes?
- Do the colors match the brand?
- Is the composition balanced and attention-grabbing?
- Would this make YOU want to click?

Ask the user:
- Which variation do you prefer?
- Any adjustments needed?
- Text changes?
- Color or mood changes?

---

## Phase 5: Evolve

Iterate based on feedback.

### Common Adjustments
- **Face repositioning**: Adjust placement description in prompt
- **Text changes**: Update text overlay in prompt
- **Color shifts**: Modify color descriptions
- **Style changes**: Adjust style descriptors
- **Background changes**: Update background description
- **Element additions/removals**: Add or remove visual elements

### Iteration Process
- Save previous versions (append `_v2`, `_v3`, etc.)
- Update only the changed aspects of the prompt
- Regenerate and present the updated thumbnail
- Update `prompts.md` with revision history

---

## Assets Management

### Face Images
Store face PNGs in `claude/skills/thumbnail-creator/assets/`:
- Use transparent background (PNG) for best results
- High resolution preferred (minimum 512x512)
- Clear, well-lit photos work best
- Multiple expressions/poses are helpful

### Reference Images
- Store in `images/references/` for general references
- Store in `claude/skills/thumbnail-creator/assets/` for thumbnail-specific assets

---

## Example Conversation Flow

**User**: Create a thumbnail for my video about Claude Creatives — the 3 skills that create your content. I want my face in the right corner, smiling, with the Claude logo visible.

**Claude (Phase 1 — Gather)**:
- Topic: Claude Creatives system
- Concept: Tech/AI themed, showcasing the 3 skills
- Face: Check assets folder for user's face PNG
- Logo: Check images/logos/ for Claude logo
- Style preferences: [asks user]

**Claude (Phase 2 — Compose)**:
- Designs composition: Face right side, Claude logo left, bold text "CLAUDE CREATIVES" center-left
- Generates detailed prompt
- Presents to user for approval

**Claude (Phase 3 — Generate)**:
- Uploads face PNG and logo to get public URLs
- Generates 2-3 thumbnail variations
- Saves to `outputs/thumbnails/claude-creatives-video/`

**Claude (Phase 4 — Review)**:
- Shows all variations
- Asks which one the user prefers

**Claude (Phase 5 — Evolve)**:
- Applies requested changes
- Regenerates final version
