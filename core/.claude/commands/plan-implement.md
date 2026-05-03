---
description: Structured plan-then-implement workflow. Use for any change touching more than one file or when the approach is unclear. Prevents wasted implementation work from wrong assumptions.
---

# /plan-implement $ARGUMENTS

Work through these steps in order. Do not skip or merge steps.

## 1. Explore (read-only)

Read the relevant files. Use Grep and Glob to find related code. Do **not** edit anything.

State when done:
- Which files you read
- Your understanding of how the relevant code works
- Anything you couldn't find or verify

## 2. Plan

Write a plan covering:
- Which files change and what each change is
- Any new files to create
- Verification approach (which test commands, which test cases)
- Risks and edge cases you identified
- Anything you're uncertain about

**Stop here and wait for explicit approval before continuing.**

## 3. Implement

Execute the approved plan. If you discover mid-implementation that the plan was wrong, stop and revise the plan rather than improvising.

## 4. Verify

Run the verification commands from the plan. Show output. Per `agent_docs/verification.md`: state explicitly what passed, not vague "all good".

## 5. Summarize

- What changed
- What was verified
- Any follow-up work
