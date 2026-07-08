# Fact-Checking & Verification Prompt

## Step 1: Generate Content with Safeguards

"Write an article about [Topic].

**Instructions:**
- If you're not completely certain about something, say 'I'm uncertain about this' before that claim.
- For each claim, specify the type of source (e.g., industry report, expert opinion, building code).
- Your knowledge cutoff is [Date]. For anything after, say you cannot verify it.
- After each claim, add [Confidence: High/Medium/Low].
- Provide ranges rather than specific numbers unless completely certain."

## Step 2: Request Self-Verification

"Review your previous response. What might be uncertain or require fact-checking?"

## Step 3: Plan Verification

"How should I verify the claims in your response? Provide specific search queries or websites to check for each claim."

## Step 4: Human Spot-Check

- [ ] Verify all names, dates, and statistics.
- [ ] Double-check all prices and technical specifications.
- [ ] Confirm any legal or safety-related claims with a reputable source.
