---
name: xppai-365-explain
description: Explain supplied D365FO X++ and metadata without inventing runtime context
---

# xppAI 365 explain

## References and evidence

Load `xppai-365-core` once per request (core itself does not recurse). Resolve only relevant references from `../../references/manifest.json` in this source tree, or `../xppai-365-references/manifest.json` when installed/exported. Reuse an existing intake summary. The baseline is D365FO; supplied source, metadata, and errors establish only what they actually show.

Trace the supplied entry point, arguments, control flow, data access, transaction scope, returned values, and relevant extension behavior. Separate what the code does from business intent inferred from names.

Reference the exact method or property involved. Distinguish base behavior, CoC wrappers, event handlers, and metadata extensions. Without base declarations or other extensions, do not claim the entire execution chain or its ordering is known.

For XML explain visible metadata and embedded source; a referenced element whose source is missing remains unknown. For errors explain supported causes without promoting a hypothesis to confirmed root cause.

Return a concise explanation in the user's language. Include a small example only if it clarifies behavior. Do not rewrite code unless requested; if a defect matters, identify it and its effect without inventing a full project.
