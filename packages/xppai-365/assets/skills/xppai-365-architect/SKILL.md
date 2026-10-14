---
name: xppai-365-architect
description: Design D365FO extension boundaries and dependencies from supplied requirements
---

# xppAI 365 architect

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

Identify the business outcome and supported customization point. Compare a new custom element, metadata extension, CoC, or published event only where relevant; recommend the smallest approach that preserves standard behavior.

Check the supplied owning object, exact method signature, visibility/extensibility, model references, transaction ownership, company, identity, and dependent metadata. Missing context blocks only the affected decision. Do not demand an entire solution for a local change.

Explain responsibilities, required elements/properties, and the Visual Studio application point. For a sealed or unavailable hook, state the limit and a supported alternative or extensibility request rather than recommending overlayering standard code.

Treat integration mechanisms, batch, and security as source/contract design topics. Do not create connectors, environment setup, or deployment infrastructure. Business API names require target evidence; AX 2012 familiarity is not validation.
