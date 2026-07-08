---
name: lovable-prompting
description: "Expert prompting strategies for building apps with Lovable.dev. Use this skill whenever the user mentions Lovable, asks for help prompting Lovable, wants to build or debug something in Lovable, needs a Lovable prompt written, or asks about vibe coding with Lovable. Also trigger when the user wants to create a Knowledge Base, debug Lovable errors, integrate webhooks/make.com/n8n with Lovable, refactor code in Lovable, or improve their Lovable workflow. This skill covers project setup, iterative building, debugging flows, design prompts, refactoring, integrations, and the meta-prompting technique."
---

# Lovable Prompting Skill

Help users write effective prompts for Lovable.dev, the AI app builder that transforms natural language into working software. This skill covers the full lifecycle: project kickoff, iterative feature building, debugging, design, refactoring, and external integrations.

## Core Principles

Lovable's AI predicts responses based on patterns. It does not "understand" in a human way. Your job is to give enough structured context that the model predicts the right output. Three rules govern everything:

1. **Be explicit.** "Build a login page" is weak. "Create a login page using React with email/password authentication, Supabase auth, and JWT handling" is strong. Name the tech stack, the behavior, and the expected outcome.

2. **Front-load important details.** The model pays more attention to the beginning and end of a prompt. Put critical requirements up front. Put nice-to-haves at the end.

3. **One task at a time.** Sending five tasks simultaneously causes confusion and hallucination. Build page by page, section by section, feature by feature.

## Workflow Overview

Follow this sequence for every Lovable project:

1. **First prompt** = high-level vision + UI direction (no backend yet)
2. **Connect Supabase** before building backend features
3. **Build frontend** page by page, section by section
4. **Plug backend** using Supabase integration
5. **Refine UX/UI** after core functionality works
6. **Integrate external services** (webhooks, APIs) last

## Chat Mode vs Default Mode

Lovable has two modes. Choosing the right one prevents wasted credits and broken code.

**Default Mode (Edit Mode):** Use for implementing features. Every prompt here writes or modifies code.

**Chat Mode (Labs feature, enable in Settings > Account > Labs):** Use for planning, debugging, and brainstorming. No code changes happen. Use chat mode to:

- Validate your plan before implementing: "Here's my vision. Does this make sense? Play it back to me."
- Debug errors without changing code: "Use chain-of-thought reasoning to identify the root cause of this error."
- Check API compatibility: "I want to use GPT-4o. Do you know how to implement it? Show me the code block."
- Plan refactoring: "What files would you change? Walk me through the plan before editing."
- Create reverse meta prompts: "Summarize all errors we hit and create a detailed prompt I can reuse next time."

After agreeing on a plan in chat mode, say "Implement this plan" to switch to execution. Note: implementing a plan resets you to default mode. Switch back manually if needed.

## Writing Your First Prompt

Use this proven structure:

```
I need a [type] application with:

Tech stack:
- Frontend: [React, Tailwind, ShadCN]
- Auth: [Supabase Auth]
- Database: [Supabase / Postgres]

Core features:
- [Main feature 1]
- [Main feature 2]

Start with the main page containing:
[Detailed page requirements]
```

Start with a blank project and build incrementally. Let the AI grasp fundamentals before adding complexity.

## Knowledge Base

Set up a Knowledge Base in project settings early. This gives the AI persistent context across every prompt. Include:

1. **PRD (Project Requirements Document):** Introduction, app flow, core features, tech stack, in-scope vs out-of-scope
2. **User flow:** "Users land on the homepage, click sign-up, register with Google, then see the dashboard with X sections."
3. **Tech stack:** Frontend framework, backend (Supabase), API integrations, deployment, libraries
4. **Frontend guidelines:** Design principles, color palettes, typography, page layouts, navigation
5. **Backend structure:** Auth method, database schema, storage buckets, API endpoints, security

After adding the Knowledge Base, prompt in chat mode:

```
Before you write any code, review the Knowledge Base and share your understanding of my project.
```

## Prompting Techniques

### Meta Prompting

Use AI to write your prompts. Assign it the role of a prompt engineer:

```
You are a world-class prompt engineer. Write me a detailed but concise prompt
that will generate a full-stack app taking an input of name, number, and company,
and generating a company report.
```

If the output misses something, correct it iteratively until the prompt captures your full intent.

### Reverse Meta Prompting

After a painful debugging session, capture the lessons before closing the chat:

```
Summarize all the errors we encountered, why they happened, and how they were
resolved. Then create a detailed end-to-end prompt I can use next time to avoid
these issues entirely.
```

The output becomes a reusable starter prompt with exact tech requirements, SQL setup, edge function patterns, and error-prevention guardrails.

### Diff & Select Prompting

When modifying existing features, tell Lovable to be surgical:

```
Implement modifications to the feature while ensuring core functionality, other
features, and processes remain unaffected. Evaluate behavior and dependencies
to identify potential risks. Discuss concerns before moving forward. Test
thoroughly for regressions. Pause if uncertain.
```

### Lock Files

Lovable has no built-in file locking. Protect sensitive files by adding to each prompt:

```
Do not alter pages X or Y. Focus changes solely on page Z.
```

For delicate updates:

```
This update requires utmost precision. Examine all dependencies and potential
impacts before implementing changes. Test systematically. Avoid shortcuts or
assumptions. Pause if unsure.
```

## Supabase & Row Level Security

Supabase RLS is a common source of errors. Expect issues whenever:

- Users need to see other users' data (matchmaking, social features, shared content)
- Uploaded files need to be viewable in the UI (storage bucket policies)
- Edge functions interact with protected tables

In your prompt, be explicit: "Disable RLS on the [table_name] table" or "Add an RLS policy that allows authenticated users to read all rows." If you leave security unmentioned, Supabase defaults to hiding everything, which breaks functionality silently.

## Reference Files

This skill includes detailed prompt libraries for specific use cases. Read the relevant reference file before generating prompts:

- **`references/prompt-library.md`** - Ready-to-use prompts for: design/UI, mobile-first, refactoring (8 stages), Stripe integration, diff & select, file locking, and console cleanup
- **`references/debugging-flow.md`** - Complete debugging methodology: 10-step escalation ladder from initial investigation to full system audit, developer tools usage, handling unexpected behavior, and the "Try to Fix" button workflow
- **`references/integrations-guide.md`** - Webhook/automation patterns for make.com and n8n. When to use edge functions vs external automation. Webhook setup, response handling, and API call patterns

## When Helping Users

1. **Ask what stage they're at.** New project? Mid-build? Debugging? The advice changes completely based on context.
2. **Default to chat mode advice for debugging.** Users burn credits and create regressions by debugging in default mode.
3. **Always suggest one-task-at-a-time.** If a user wants five features, break them into five sequential prompts.
4. **Recommend the Knowledge Base early.** Most errors stem from the AI lacking project context.
5. **Generate ready-to-paste prompts.** Users want copy-paste prompts, not abstract advice. Write the actual prompt they should send to Lovable.
6. **Use reverse meta prompting after complex sessions.** Remind users to capture lessons before closing a chat.
7. **For design requests**, read `references/prompt-library.md` and pull the appropriate design/mobile-first prompts.
8. **For debugging requests**, read `references/debugging-flow.md` and walk the user through the escalation ladder.
9. **For integration requests**, read `references/integrations-guide.md` and guide them through webhook setup.
