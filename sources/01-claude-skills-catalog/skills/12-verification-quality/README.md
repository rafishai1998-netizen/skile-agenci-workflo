# Verification & Quality

> Truth scoring, verification loops, skill health monitoring, context budgets, eval frameworks, and skill building tools.

## When to Use These Skills
- Verifying the accuracy and quality of AI-generated outputs
- Running iterative verification loops on code or content
- Monitoring skill health and managing context window budgets
- Building new skills or evaluating existing ones

## Quick Reference

| Skill | Difficulty | Trigger Phrase | Best For |
|-------|-----------|----------------|----------|
| verification-loop | Intermediate | `/verification-loop` | Iterative output verification and correction |
| truth-scoring | Advanced | `/truth-scoring` | Factual accuracy scoring for AI outputs |
| skill-health | Intermediate | `/skill-health` | Monitoring skill reliability and performance |
| context-budget | Intermediate | `/context-budget` | Managing context window token usage |
| eval-framework | Advanced | `/eval-framework` | Building evaluation pipelines for AI outputs |
| skill-builder | Intermediate | `/skill-builder` | Creating new skills from templates |
| quality-gates | Intermediate | `/quality-gates` | Defining pass/fail criteria for outputs |

## Start Here
If you're new to this category, start with **verification-loop** -- it's the most general-purpose quality skill and implements iterative checking that applies to any output type (code, content, data).

## Skill Relationships
**verification-loop** is the central skill that orchestrates repeated checking and correction cycles. **truth-scoring** provides the factual accuracy component within verification, while **quality-gates** defines the pass/fail criteria that determine when verification is complete. **eval-framework** is a more structured approach for building repeatable evaluation pipelines. **context-budget** is a utility skill that ensures verification processes don't exhaust the context window. **skill-health** monitors the reliability of all skills in the catalog, including verification skills themselves. **skill-builder** creates new skills and can use the eval framework to validate them.
