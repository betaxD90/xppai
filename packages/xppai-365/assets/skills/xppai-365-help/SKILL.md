---
name: xppai-365-help
description: Describe the xppAI 365 skill catalog, inputs, outputs, and installation commands
---

# xppAI 365 help

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

xppAI 365 is D365FO X++ guidance delivered as skills. Give the assistant code, XML metadata, a diff, a diagnostic, or requirements and ask for the intended result. No database connection or Visual Studio installation is needed for source review.

Choose explain for behavior, architect for design, risk for change impact, codefix for defects, dev for new behavior, and papai for a mixed request. Core supplies shared rules; intake normalizes evidence once.

CLI: list and path inspect bundled skills; install --target <claude|codex|qwen|copilot|all> [--mode copy|symlink] installs them; export --target <claude|codex|qwen|copilot|generic> --out <directory> exports them. Generic is export-only. The CLI does not analyze X++ or call an LLM.

Output can be an explanation, full method/class, diff, or metadata application instructions. A snippet is not a deployment package. Binary archive parsing and XPO/cache commands are not supplied. Runtime compilation, synchronization, deployment, and execution remain the user's environment checks.

Do not describe unimplemented features or excluded compliance specialists as available.
