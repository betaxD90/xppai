---
name: xppai-365-dev
description: Implement new D365FO behavior from supplied requirements and verified extension points
---

# xppAI 365 dev

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

Use for new behavior; corrections of existing defects belong to codefix. Establish the intended result, available source, and acceptance behavior. Ask for names/signatures or permission to propose custom names only when necessary. Do not block a bounded draft on irrelevant deployment metadata.

Choose supported D365FO extension mechanisms. Return a complete custom class/extension where requirements and base signatures suffice; otherwise separate a conditional sketch from verified application-specific code. Do not invent standard methods, data entity keys, public collection names, service operations, or labels.

Preserve standard framework behavior, company and transaction ownership, security, localization, and extension semantics. Create only elements required by the feature. Specify the model dependency when supported, and identify the Application Explorer element, metadata properties, and Visual Studio location where the user applies the result.

Provide focused acceptance checks; proposed SysTest code is not an executed test. Do not emit an entire solution, binary package, installer, or environment connection for a code request. Keep explanation and code lean.

