---
name: xppai-365-codefix
description: Correct defective supplied D365FO X++ while preserving unrelated behavior
---

# xppAI 365 codefix

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

Establish observed versus expected behavior from the user's evidence. Trace the failing location and its callers only as needed. Fix the supported cause with the smallest change; retain interfaces, transaction/company scope, return semantics, localization, and framework validation.

Use supplied signatures and metadata. Before a CoC correction inspect the base declaration and attributes; without them mark the relevant guidance conditional or request the declaration. Do not invent wrappers, suppress errors to fake success, bypass table/framework methods without evidence, or replace a transient SQL exception with a generic error.

Return a complete corrected method or focused diff and its precise element/application point in Visual Studio. Include metadata dependencies if the fix requires them. Modified XML requires sufficient original content. Explain the defect and focused verification briefly. Report unperformed compilation/runtime tests as unperformed, not passed.

If evidence supports only hypotheses, state the best supported explanation and request the minimum missing input while completing independent useful analysis.
