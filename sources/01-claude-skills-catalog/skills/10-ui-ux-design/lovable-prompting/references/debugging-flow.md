# Lovable Debugging Flow

Debugging in Lovable follows a systematic escalation. Start gentle, escalate only when needed. Each level applies more pressure and broader analysis.

## The "Try to Fix" Button

Lovable has a built-in "Try to Fix" button that auto-detects and resolves errors. It does not consume credits. Use it up to three times before escalating. If it does not resolve the issue after three attempts, switch to manual debugging.

## Developer Tools

Open Chrome DevTools (right-click > Inspect, or Cmd+Option+I / Ctrl+Shift+I) to get meaningful error details:

- **Console tab:** Error messages, stack traces, and warnings
- **Network tab:** Failed API requests, wrong status codes, request/response payloads
- **Elements tab:** DOM inspection for UI issues

Screenshot these errors and paste them into Lovable with context. The AI responds better to specific error messages than vague descriptions like "it's broken."

## Debugging Escalation Ladder

Use these prompts in order. Start at Level 1. Only move to the next level if the previous one did not resolve the issue.

### Level 1: Initial Investigation

```
The same error continues to occur. Perform a preliminary investigation to
uncover the root cause. Examine logs, workflows, and dependencies to gain
insight into the problem. Do not make any changes until you fully grasp the
situation and can suggest a solution informed by your analysis.
```

### Level 2: Deep Analysis

```
The issue persists without resolution. Perform a thorough analysis of the flow
and dependencies, halting all modifications until the root cause is identified
with complete certainty. Record the failures, reasons behind them, and any
observed patterns or anomalies. Avoid speculation. Ensure findings are detailed
and complete before suggesting any solutions.
```

### Level 3: Full System Review

```
This is a pressing issue that requires a thorough re-evaluation of the entire
system. Halt all edits. Begin by outlining the flow systematically, covering
authentication, database interactions, integrations, state management, and
redirects. Evaluate each component individually to pinpoint failures and causes.
Deliver a comprehensive analysis to validate the problem before proceeding.
```

### Level 4: Comprehensive Audit

```
The problem continues and now calls for a comprehensive, system-wide audit.
Step back and carefully map the entire system flow, examining all interactions,
logs, and dependencies. Generate a clear and detailed report outlining expected
behaviors, current realities, and any discrepancies. Do not suggest or modify
any code until you have accurate, evidence-based insights.
```

### Level 5: Rethink and Rebuild

```
This problem remains unresolved, and it is imperative to pause and reassess
our entire strategy. Do not make any code edits at this stage. Instead, conduct
a thorough and systematic examination of the system. Create a comprehensive
flow map, tracing each interaction, log, and dependency. Document what should
occur, what is currently happening, and pinpoint where discrepancies arise.
Compile a detailed report outlining the root cause with clear evidence. If you
encounter gaps, uncertainties, or edge cases, highlight them for discussion.
Until you can pinpoint the exact, verified origin of the issue, do not suggest
or implement any fixes. This demands complete attention, without assumptions
or shortcuts.
```

### Level 6: Explaining Errors

When you need to understand an error before fixing it:

```
Explain the meaning of this error, its origins, and the logical sequence that
led to its occurrence. Provide a concise breakdown of the problem and its
possible underlying cause. Do not edit any code at this stage.
```

### Level 7: Confirming Findings

Before implementing a fix:

```
Before moving ahead, are you entirely convinced that you have pinpointed the
true root cause of the problem? Review your analysis and check for overlooked
dependencies, edge cases, or associated factors. Ensure your proposed solution
targets the root cause with solid evidence and reasoning. If there are lingering
doubts, step back and reevaluate before proceeding.
```

### Level 8: Checking Complexity

After identifying a fix:

```
Take a moment to reflect on whether this solution can be simplified. Are there
superfluous steps, redundancies, or overly complex processes that could be
streamlined? Assess if a more direct approach could attain the same outcome
without compromising functionality or quality. Share ideas for simplifications
before moving forward. Do not edit any code.
```

## 10-Step Debugging Methodology

A broader framework for debugging any issue in Lovable:

1. **Task Identification:** Prioritize issues based on impact
2. **Internal Review:** Validate solutions before deploying
3. **Reporting Issues:** Clearly define current vs expected behavior
4. **Validation:** Verify changes render correctly in the DOM
5. **Breakpoints:** Isolate and test specific components
6. **Error Handling & Logging:** Use verbose logging and debug incrementally
7. **Code Audit:** Document issues and proposed fixes before making changes
8. **Use "Try to Fix":** Let Lovable auto-detect and resolve errors (free, no credits)
9. **Leverage Visuals:** Upload screenshots to clarify UI-based errors
10. **Revert to Stable Version:** Use the "Revert" button to go back if needed

## Handling Unexpected Behavior

Sometimes code runs without errors but the app does not behave as expected. Strategies:

- **Retrace your steps:** Review what you originally asked Lovable to do
- **Break it down:** Identify if specific sections are misaligned
- **Use images:** Show Lovable the UI result versus the intended outcome
- **Be specific:** Describe expected behavior and actual behavior in detail

## Writing Prompts That Prevent Errors

Structure your prompts to reduce debugging time:

- **Project Overview:** Describe what you are building
- **Page Structure:** List key pages and components
- **Navigation Logic:** Explain user movement through the app
- **Screenshots/Wireframes:** Provide visuals if available
- **Implementation Order:** Follow a logical sequence (create pages before integrating the database)

## Using External Tools for Debugging

When Lovable errors are vague:

1. Screenshot the error from DevTools
2. Paste it into a reasoning model (GPT-4o, DeepSeek, o3-mini) and ask: "What is the root cause of this error?"
3. Use the external model's analysis to write a more targeted Lovable prompt
4. Feed the fix back into Lovable with explicit instructions

This two-model approach is especially helpful for Supabase RLS errors, CORS issues, and authentication problems where the error message alone is not descriptive enough.
