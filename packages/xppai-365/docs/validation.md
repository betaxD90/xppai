# Validation

Run `npm test` and `npm run verify:artifact` from this package directory. Tests use synthetic files and temporary installation locations. The artifact verifier packs with scripts disabled, installs locally without network dependencies, runs the installed CLI, and checks all five exported target layouts and references.

Package tests cover catalog and references, CLI errors, installation/export, ownership collisions, upgrades, rollback, dangling links, and coexistence with actual AX 2009 and AX 2012 installations.

Response evaluation is separate from file/installer tests; see response-evaluation.md when those runs are recorded. Static checks and generated code do not establish D365FO compilation, synchronization, deployment, or runtime execution. No customer-system access is used.

## Recorded checks (2026-10-14)

Windows, Node v24.14.1. The package declares Node >=18; minimum-version execution has not been exercised.

- Package suite: 74 runner entries passed, 0 failed (including three helper-module discovery entries).
- Artifact verification: 50 packed files, CLI smoke checks and all five exports passed.
- Coexistence: actual AX 2009/2012 installations in all four targets, copy and symlink modes, remained unchanged after 365 installation and repeat upgrade.
- Existing AX 2009 suite: 63 passed. Existing AX 2012 suite: 116 passed after moving the new research document out of the root package's docs/*.md publication glob.
- Existing product source and package metadata have no diff from implementation base 5bb4638.

The research document now lives at repository-relative docs/superpowers/research/xppai-365-d365fo-technical-particularities.md; this avoids adding it to the AX 2009 npm artifact. This documentation relocation changes no older-product runtime behavior.
