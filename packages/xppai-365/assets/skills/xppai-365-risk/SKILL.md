---
name: xppai-365-risk
description: Assess concrete D365FO change risks with evidence and bounded verification
---

# xppAI 365 risk

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

Assess the proposed delta against the supplied baseline. Prioritize business impact: transaction integrity and duplicate effects, extension compatibility, company/security boundaries, metadata/build dependencies, and changed application behavior.

For each material risk, state the trigger, effect, supporting code/metadata location, and a focused mitigation or test. Distinguish observed defects from hypothetical risks and unknown configuration. Do not assign numerical certainty without a defined basis.

Keep static review, package checks, and D365FO execution evidence separate. A build log proves only its own build/context. If deployment matters, identify the necessary target-specific verification; do not assume one topology or ask for credentials. Avoid generic checklists for risks unrelated to the change.

