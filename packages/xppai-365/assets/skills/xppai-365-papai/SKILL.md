---
name: xppai-365-papai
description: Route ambiguous or mixed D365FO requests through minimal evidence-based specialist work
---

# xppAI 365 papai

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

Use when a request mixes explanation, design, risk, and implementation. A single clear request goes directly to its specialist.

| Intent | Specialist |
| --- | --- |
| Existing behavior | xppai-365-explain |
| Design and extension boundaries | xppai-365-architect |
| Concrete change risks | xppai-365-risk |
| Defective existing behavior | xppai-365-codefix |
| New behavior | xppai-365-dev |
| Usage/capabilities | xppai-365-help |

Apply core, normalize intake once if needed, select only relevant manifest domains, and use the minimum specialist sequence. This is instruction routing within the assistant, not a mandate to spawn agents or invoke another model. Do not loop through every specialist, reread the same source, or produce a fixed multi-section report.

Ask one focused question only if evidence blocks the next action; otherwise proceed with qualified assumptions. Synthesize findings with source locations and useful code first. Stop speculation when the needed evidence is absent and name that evidence. Never turn repeated investigation into a claim of certainty.
