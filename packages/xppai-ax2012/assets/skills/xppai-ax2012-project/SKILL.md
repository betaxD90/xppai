---
name: xppai-ax2012-project
description: Create or use a lightweight local Microsoft Dynamics AX 2012 R3 project workspace with on-demand documentation and safe code-tag rules
---

# xppAI AX 2012 R3 Project Workspace

Use this skill when a Microsoft Dynamics AX 2012 R3 change needs a named local project workspace, a simplified project document, or the project documentation-tag policy.

**Required baseline:** `xppai-ax2012-core`

## Lean workflow

Locate `.xppai-ax2012.json` from the requested root or its parents. If it does not exist, ask only for the next missing value, in this order:

1. Folder name, only when a new root must be created.
2. Company tag.
3. Project name.
4. Developer name.
5. Objective.

Create the workspace with `xppai-ax2012 project init` using explicit flags. Do not create a plan, review, technical document, functional summary, test plan, AX artifact, global registry, or background process until the user requests that stage.

When a user requests a stage, create only that document with `xppai-ax2012 project document --stage <stage>`. The available stages are `action-plan`, `code-review`, `technical-changes`, `functional-summary`, and `test-plan`.

## Documentation tags

For a new tag pair, use the configured company tag, project name, developer name, and the current local date:

```xpp
//<FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">
// changed code
//</FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">
```

Keep the opening marker, code, and closing marker at the same indentation level. Do not use backslashes in the markers.
The marker syntax, attribute order, and single spaces shown above are canonical. Treat noncanonical spacing or formatting as ambiguous and stop rather than rewriting existing source.

- A new class receives the pair only around `classDeclaration`.
- A new table receives a pair around every newly created method.
- An existing object receives a pair around exactly the changed source range.
- If that range already has tags for this project, preserve the existing markers and their original date.
- Do not remove or rewrite tags from another developer.
- Retain obsolete code as commented source inside a new tag pair; do not delete it.

Read the source range before editing. If tag pairs overlap, attributes mismatch, the range is unclear, or more than one workspace applies, stop and ask for clarification. Do not resolve ambiguity by moving, reformatting, or deleting source.

## AX 2012 boundary

Keep changes within the current company unless the user explicitly requests cross-company behavior. Treat layer, model, build, database synchronization, CIL, deployment, security, and runtime state as `Unknown` until evidence establishes them. Distinguish package-local checks from AX environment confirmation.
