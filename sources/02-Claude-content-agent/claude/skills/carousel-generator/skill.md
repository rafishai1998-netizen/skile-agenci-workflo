# Carousel Generator Skill

Generate multi-slide image carousels for social media (Instagram, TikTok, LinkedIn, Threads).

## Workflow Overview

This skill follows a **5-phase workflow**:

1. **Gather** — Collect context and requirements from the user
2. **Prompts** — Generate optimized image prompts for each slide
3. **Generate** — Create images via the Nano Banana Pro API
4. **Review** — Present results for user approval
5. **Evolve** — Iterate and refine based on feedback

---

## Phase 1: Gather

Collect the following information from the user before proceeding:

### Required Information
- **Topic/Content**: What is the carousel about?
- **Number of slides**: How many slides? (typically 4-10)
- **Slide content**: What text/message should each slide convey?
- **Call to action**: What should the last slide encourage? (follow, visit link, comment, etc.)

### Style Information
- **Style references**: Does the user have reference images? Check `images/references/` folder
- **Brand colors**: Primary and secondary colors (e.g., hex codes)
- **Visual style**: Minimalist, editorial, bold, playful, professional, etc.
- **Font style preference**: Serif, sans-serif, handwritten, bold display
- **Mood/tone**: Educational, promotional, inspirational, informative

### Platform Target
- **Primary platform**: Instagram, LinkedIn, TikTok, Threads
- **Aspect ratio**:
  - Instagram/TikTok: 1080x1350 (4:5) or 1080x1080 (1:1)
  - LinkedIn: 1080x1080 (1:1) or 1200x1500 (4:5)
  - Stories: 1080x1920 (9:16)

### Style Reference Handling

If the user provides reference images:
1. Save reference images to `images/references/` if not already there
2. Create a style guide file in `styles/` capturing:
   - Color palette extracted from references
   - Layout patterns observed
   - Typography style
   - Visual elements and motifs
3. Name the style guide descriptively (e.g., `editorial-serif-minimal.md`)

---

## Phase 2: Prompts

Generate individual image prompts for each carousel slide.

### Prompt Engineering Guidelines

For each slide, create a detailed prompt that includes:

1. **Visual composition**: Describe the layout, placement of elements
2. **Text content**: Exact text to render on the image (Nano Banana Pro excels at text rendering)
3. **Color scheme**: Specify exact colors matching the brand
4. **Style descriptors**: Match the gathered style preferences
5. **Consistency markers**: Include common elements across all slides for visual cohesion:
   - Same background style/color family
   - Consistent text placement and sizing
   - Matching decorative elements
   - Brand watermark/logo placement

### Prompt Template

```
Create a [style] social media carousel slide [N of total].

Content: [slide text/message]
Layout: [describe element placement]
Colors: Background [color], Text [color], Accent [color]
Typography: [font style] heading, [font style] body text
Visual elements: [icons, illustrations, patterns, etc.]
Brand: [brand name] logo/watermark in [position]
Aspect ratio: [ratio]
Style: [detailed style description matching references]
Consistency: This is slide [N] of [total] in a cohesive carousel series. Maintain visual consistency with [shared elements].
```

### Slide Structure Best Practices

- **Slide 1 (Hook)**: Bold headline, attention-grabbing visual, minimal text
- **Slides 2-N (Content)**: Key points, educational content, tips, steps
- **Final Slide (CTA)**: Clear call to action, social handles, link/offer

Present all generated prompts to the user for approval before proceeding to generation.

---

## Phase 3: Generate

Execute image generation for each slide.

### Generation Process

1. **Cost estimate**: Calculate and present total cost before generating
   - kie.ai: ~$0.09 per image × number of slides
   - fal.ai: ~$0.15 per image × number of slides

2. **Wait for user approval** of cost estimate

3. **Generate images** using `scripts/generate_image.py`:
   ```bash
   python3 scripts/generate_image.py --prompt "<slide_prompt>" --aspect-ratio "<ratio>" --output "<output_path>"
   ```

4. **For each slide**:
   - Run generation with the crafted prompt
   - Save to `outputs/carousels/<project-name>/slide_01.png`, `slide_02.png`, etc.
   - Log the prompt used

5. **If using style references** for image-to-image:
   - Upload reference image first: `python3 scripts/upload_image.py --file "<path>"`
   - Pass the returned URL as `--reference-url` to generate_image.py

### Output Organization

Create a project folder in `outputs/carousels/`:
```
outputs/carousels/<project-name>/
├── slide_01.png
├── slide_02.png
├── slide_03.png
├── ...
├── slide_N.png
├── prompts.md          ← Document all prompts used
└── style_reference.png ← Copy of style reference used (if any)
```

The `prompts.md` file should document:
- Each slide number and its full prompt
- Style settings used
- Generation parameters (model, aspect ratio, etc.)
- Cost per image and total cost

---

## Phase 4: Review

Present the generated carousel to the user.

### Review Process

1. **Show all slides** in order to the user
2. **Highlight**: Mention the output folder path where images are saved
3. **Ask for feedback**:
   - Are you happy with the overall style?
   - Any slides need regeneration?
   - Text rendering correct on all slides?
   - Colors and brand consistency OK?
   - Ready to post or need changes?

---

## Phase 5: Evolve

Iterate based on user feedback.

### Evolution Options

- **Regenerate specific slides**: Re-run generation for specific slide numbers with adjusted prompts
- **Style adjustment**: Modify the overall style and regenerate all slides
- **Text changes**: Update text content and regenerate affected slides
- **Color tweaks**: Adjust brand colors and regenerate
- **Layout changes**: Modify composition/layout and regenerate

### Iteration Guidelines

- Keep previous versions (append `_v2`, `_v3` to filenames)
- Update `prompts.md` with the revised prompts
- Only regenerate what's needed (don't redo the entire carousel if only one slide needs changes)
- Each iteration should refine, not start from scratch

---

## API Integration

### Using kie.ai (Default)

```bash
# Text-to-image generation
python3 scripts/generate_image.py \
  --prompt "Your detailed prompt here" \
  --aspect-ratio "4:5" \
  --output "outputs/carousels/my-carousel/slide_01.png"

# With style reference (image-to-image)
python3 scripts/generate_image.py \
  --prompt "Your detailed prompt here" \
  --aspect-ratio "4:5" \
  --reference-url "https://uploaded-reference-url.com/image.png" \
  --output "outputs/carousels/my-carousel/slide_01.png"
```

### Using fal.ai (Alternative)

Set `IMAGE_PROVIDER=fal` in `.env` — the same script commands work with both providers.

---

## Example Conversation Flow

**User**: Create a 6-slide carousel about Claude Creatives — the 3 skills that create your content

**Claude (Phase 1 — Gather)**:
- Topic: Claude Creatives system overview
- Slides: 6
- Content: Hook + 3 skill breakdowns + benefits + CTA
- Style: [asks user for preferences]
- Brand colors: [asks user]

**Claude (Phase 2 — Prompts)**:
- Generates 6 detailed prompts
- Presents to user for approval

**Claude (Phase 3 — Generate)**:
- Cost: 6 × $0.09 = $0.54
- Waits for approval
- Generates all 6 slides
- Saves to `outputs/carousels/claude-creatives-3-skills/`

**Claude (Phase 4 — Review)**:
- Shows all 6 slides
- Asks for feedback

**Claude (Phase 5 — Evolve)**:
- Makes requested changes
- Regenerates only affected slides
