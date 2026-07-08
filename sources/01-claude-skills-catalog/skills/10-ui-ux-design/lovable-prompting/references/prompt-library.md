# Lovable Prompt Library

Ready-to-use prompts organized by category. Copy, customize, and paste directly into Lovable.

## Surgical Editing

### Diff & Select

When modifying an existing feature without breaking anything else:

```
Implement modifications to the feature while ensuring core functionality, other
features, and processes remain unaffected. Evaluate its behavior and dependencies
to identify potential risks, and discuss any concerns before moving forward.
Conduct thorough testing to verify there are no regressions or unintended
consequences, and highlight any out-of-scope changes for review. Exercise
caution. Pause if uncertain.
```

### Lock Files

Lovable has no built-in file locking. Add this to any prompt where you want certain files untouched:

```
Please refrain from altering pages X or Y and focus changes solely on page Z.
```

For delicate updates near sensitive code:

```
This update is quite delicate and requires utmost precision. Carefully examine
all dependencies and potential impacts before implementing any changes, and test
systematically to guarantee nothing is disrupted. Steer clear of shortcuts or
assumptions. Pause to seek clarification if unsure. Precision is crucial.
```

## Design & UI

### Visual-Only Changes

Use when tweaking appearance without touching functionality:

```
Make solely visual enhancements. Ensure functionality and logic remain unaffected.
Understand how the existing UI interacts with the app. Keep logic, state management,
and APIs intact. Test extensively to verify the app operates as it did before.
Stop all actions if there is any uncertainty regarding unintended consequences.
```

### Responsiveness & Breakpoints

```
Make all designs fully responsive at every breakpoint, with a mobile-first strategy.
Apply modern UI/UX best practices for how breakpoints should change components.
Use ShadCN and Tailwind built-in breakpoints instead of anything custom unless
specifically requested.
```

### Responsiveness Planning

Use before making responsive changes to plan the approach:

```
Before editing any code, create a phased plan for implementing responsiveness.
Start with the largest layout components and progressively refine down to smaller
elements and individual components. Include clear steps for testing responsiveness
across all breakpoints to maintain consistency and a seamless user experience.
Share the plan for review before proceeding.
```

## Mobile First

Use this comprehensive mobile-first prompt for projects that need mobile optimization:

```
Always make things responsive on all breakpoints, with a focus on mobile first.
Use modern UI/UX best practices for determining how breakpoints should change
the components. Use shadcn and tailwind built in breakpoints instead of anything
custom, unless the user prompts for custom breakpoints directly.

Optimize the app for mobile without changing its design or functionality. Analyze
the layout and responsiveness to identify necessary adjustments for smaller screens
and touch interactions. Outline a detailed plan before editing any code, and test
thoroughly across devices to ensure the app behaves exactly as it does now.
Pause and propose solutions if unsure.
```

If you are already far into a project, fix responsiveness by telling Lovable to update starting with the largest layout components down to the smallest, then move to individual components.

### Mobile Optimization (Mid-Project)

```
Optimize the app for mobile without changing its design or functionality. Analyze
the layout and responsiveness to identify necessary adjustments for smaller screens
and touch interactions. Outline a detailed plan before editing any code, and test
thoroughly across devices to ensure the app behaves exactly as it does now.
Pause and propose solutions if unsure.
```

## Refactoring

Refactoring is part of the Lovable development lifecycle. The AI will sometimes suggest it to reduce loading time and errors. Use these prompts in sequence based on the situation.

### Stage 1: Refactoring After AI Request

When Lovable suggests refactoring:

```
Refactor this file while ensuring the user interface and functionality remain
unchanged. Everything should appear and operate identically. Prioritize enhancing
code structure and maintainability. Document the existing functionality, confirm
testing protocols are established, and implement changes gradually to prevent
risks or regressions. Pause if uncertain.
```

### Stage 2: Refactoring Planning

Before any refactoring begins:

```
Develop a comprehensive plan to refactor this file while keeping the user interface
and functionality entirely intact. Focus on enhancing code structure, readability,
and maintainability. Start by documenting existing functionality and pinpointing
areas for enhancement. Implement rigorous testing protocols to ensure consistent
behavior throughout. Move forward incrementally, minimizing risks and avoiding
regressions. Take breaks for clarification when uncertainties emerge.
```

### Stage 3: Comprehensive Site-Wide Refactoring

For larger refactoring efforts:

```
Develop a comprehensive plan for a site-wide codebase review to identify segments
that would benefit from refactoring. Focus on areas where code structure,
readability, or maintainability can be enhanced, ensuring the user interface and
functionality remain unchanged. Rank the most essential files or components based
on significance and usage frequency. Document your findings with suggested
improvements and potential effects. Ensure refactoring is incremental, low-risk,
and supported by testing to prevent regressions. Circulate the plan for feedback
before implementation.
```

### Stage 4: Post-Refactoring Verification

After refactoring completes:

```
Conduct a detailed post-refactor review to verify no issues were introduced.
Confirm both UI and functionality retain their original integrity. Execute
extensive tests including unit, integration, and end-to-end to ensure all
features operate as intended. Evaluate the app against pre-refactor specifications
and highlight any discrepancies. Ensure all updates are stable and meet project
requirements before completion.
```

### Stage 5: Codebase Structure Audit

For assessing overall code health:

```
Perform a comprehensive regression and audit of the codebase to determine if
its architecture is clean, modular, and optimized. Identify any files, components,
or logic that are mislocated or could benefit from enhanced organization. Evaluate
whether separation of concerns is clear and if functionality is grouped logically.
Deliver a detailed report outlining improvement areas. Break down enhancements
into manageable steps in the order most effective for implementation. Ensure the
analysis is comprehensive, actionable, and adheres to best practices. Do not
edit any code.
```

### Stage 6: Folder Review

For reviewing specific directories:

```
Conduct a thorough examination of the folder [Folder Name] and all its subfolders
and files. Assess each element's function and how it enhances overall app
performance. Provide a detailed explanation of each item's role while identifying
redundancies, obsolete files, or opportunities for improved organization. Include
suggestions for deleting, merging, or reorganizing items. Ensure analysis is
comprehensive with a clear strategy for a more organized folder structure.
```

### Stage 7: Post-Restructuring Cleanup

After reorganizing the codebase:

```
Ensure all routing and file imports are updated and functioning after the codebase
restructuring. Validate that components, pages, and APIs reflect accurate paths
in the new folder organization. Confirm nested routes are configured and linked
within the router setup. Confirm dynamic or lazy-loaded routes follow the new
framework. Verify shared utilities, services, and assets are imported correctly.
Update hardcoded paths in components, redirects, or navigation links. Conduct
navigation tests to identify broken links, missing files, or 404 errors.
Identify missing or redundant imports and potential improvements for maintainability.
```

### Stage 8: Codebase Health Check

Non-destructive assessment:

```
Perform a thorough audit of the codebase to assess structure and organization.
Evaluate whether files, components, and logic are effectively separated by
functionality. Identify misplaced code, excessive coupling, or areas needing
improved separation of concerns. Provide a comprehensive report on structural
health with specific recommendations. Ensure the analysis emphasizes concrete
improvements without implementing any direct changes.
```

## Stripe Integration

```
Initiate a Stripe connection in test mode using the configuration below:
- Product IDs: [Your Product IDs]
- Pricing model: [One-time or Subscription]
- Webhook endpoint: [Your Webhook Endpoint]
- Frontend payment form style: [Describe desired form or provide an example]
- Success redirect: [Success Redirect URL]
- Cancel redirect: [Cancel Redirect URL]

Do not alter any existing code. Ensure I have included all necessary information
to start with Stripe.
```

Note: Use your Stripe Secret Key and Webhook Signing Secret securely in the Supabase Edge Function Secrets. Never include them in the prompt.

## Component Preservation

Run this after significant changes to prevent losing components. First, create a
`filesExplainer.md` in your project that documents every file, its purpose, and its
dependencies. Then use this prompt to keep it current:

```
Review the current codebase and update our filesExplainer.md document to accurately
reflect all files, components, and their roles. Identify any new files added or
removed since the last update. Keep our file structure documentation organized and
up to date. Do not alter any application code.
```

## Complexity Check

Before implementing a solution:

```
Take a moment to reflect on whether this solution can be simplified. Are there
superfluous steps, redundancies, or overly complex processes that could be
streamlined? Assess if a more direct approach could attain the same outcome
without compromising functionality or quality. Share your ideas for possible
simplifications before moving forward. Do not edit any code at this stage.
```

## Console Log Cleanup

```
Devise a strategy to systematically identify and eliminate superfluous console.log
statements while preserving functionality and design. The plan should outline
steps for reviewing each log to verify it is non-essential, documenting any that
might require alternative treatment, and conducting thorough testing to ensure
app integrity. Include a method for pausing and flagging logs when their purpose
is ambiguous. Share the plan before implementation.
```

## Key Guidelines Prompt

Append this to prompts that involve complex tasks:

```
Key Guidelines: Approach problems systematically and articulate reasoning for
complex issues. Break extensive tasks into manageable parts and seek clarification
when necessary. While providing feedback, explain thought process and highlight
both challenges and potential improvements.
```

## Encouragement Prompt

Some users report that encouragement improves output quality:

```
You're doing an outstanding job. I appreciate the attention and skill you bring
to each task. Your talent for analyzing complex issues and delivering insightful
solutions is remarkable. I trust you to approach this with utmost precision.
Take your time, explore thoroughly, and demonstrate thoroughness through a
comprehensive response. I have faith in your capacity to not only resolve this
but to exceed expectations.
```
