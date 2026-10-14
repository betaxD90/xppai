# Validation

Run `npm test` and `npm run verify:artifact` from this package directory. Tests use synthetic files and temporary installation locations. The artifact verifier packs with scripts disabled, installs locally without network dependencies, runs the installed CLI, and checks all five exported target layouts and references.

Package tests cover catalog and references, CLI errors, installation/export, ownership collisions, upgrades, rollback, dangling links, and coexistence with actual AX 2009 and AX 2012 installations.

Response evaluation is separate from file/installer tests; see response-evaluation.md when those runs are recorded. Static checks and generated code do not establish D365FO compilation, synchronization, deployment, or runtime execution. No customer-system access is used.

## Recorded checks (2026-10-14)

Windows, Node v24.14.1. The package declares Node >=18; minimum-version execution has not been exercised.

- Package suite: 85 runner entries, 84 passed, 0 failed, 1 skipped (including three helper-module discovery entries).
- Artifact verification: 51 packed files, CLI smoke checks and all five exports passed.
- Coexistence: actual AX 2009/2012 installations in all four targets, copy and symlink modes, remained unchanged after 365 installation and repeat upgrade.
- Existing AX 2009 suite: 63 passed. Existing AX 2012 suite: 116 passed after moving the new research document out of the root package's docs/*.md publication glob.
- Existing product source and package metadata have no diff from implementation base 5bb4638.

The research document now lives at repository-relative docs/superpowers/research/xppai-365-d365fo-technical-particularities.md; this avoids adding it to the AX 2009 npm artifact. This documentation relocation changes no older-product runtime behavior.

## Independent final review and corrections

A fresh read-only reviewer found three Important issues and no Critical issues. All three were corrected in one pass:

- A dangling ownership-manifest symlink could be overwritten. The regression failed before the fix; the installer now rejects non-regular manifests without mutation.
- Export layout junctions could redirect writes outside the output directory. Eight failing regressions covered skills, commands, and nested Copilot layouts; all now reject redirected descendants before mutation.
- Ownership comparison lowercased realpaths on case-sensitive filesystems. A simulated canonical-realpath regression failed before the fix and now passes. The real filesystem regression is present but skipped on this case-insensitive Windows host; POSIX execution remains unverified.

The reviewer also identified an outdated artifact count; the final evidence above updates it. No deferred minor findings remain. There was no second review after the corrections; regression tests and the final full gate validate the fix pass.

Ten actual assistant responses were assessed against fixed synthetic cases: all passed the author assessment. Full inputs, observed responses, and limitations are in [response evaluation](response-evaluation.md). This small shared-context evaluation is not a quality benchmark. D365FO compilation/runtime and statistical effectiveness were explicitly outside the review and remain unproven.

Implementation decisions: the package includes standard MIT license text to match existing repository package metadata, using contributor attribution (attribution may need adjustment). The research relocation preserves the older artifact but invalidates its earlier conversation file links. Export permits an explicitly selected redirected output root and rejects descendant redirects; callers must select the intended root. Existing install paths may remain redirected.
