# xppAI 365

**Evidence-driven X++ assistance for Dynamics 365 Finance and Supply Chain Management (D365FO).**

xppAI 365 gives your AI assistant focused guidance for understanding and changing D365FO code. Provide the relevant X++, metadata, diff, error, trace, or requirements; the assistant uses the supplied evidence to explain behavior, assess a change, correct a defect, or draft new behavior.

This package is dedicated to D365FO. AX 2009 and AX 2012 have separate packages, skills, and command namespaces. They are not interchangeable: AX 2009 and AX 2012 material is migration evidence only when you explicitly ask for a migration analysis.

## Workflows

| Need | Start with |
| --- | --- |
| Understand existing code or metadata | `xppai-365-explain` |
| Choose an extension point or shape a design | `xppai-365-architect` |
| Review the risks in a proposed change | `xppai-365-risk` |
| Fix a defect in supplied code | `xppai-365-codefix` |
| Implement new behavior from requirements | `xppai-365-dev` |
| Route a request that combines several kinds of work | `xppai-365-papai` |

The package also includes `xppai-365-core` for shared evidence and output rules, `xppai-365-intake` for organizing supplied material, and `xppai-365-help` for usage guidance. Its seven platform references cover Visual Studio and metadata, extensibility, X++ transactions, data and integration, batch, security, and validation.

## Quick start

From this package directory, list the bundled skills and install them for one supported assistant:

```powershell
node bin/xppai-365.js list
node bin/xppai-365.js install --target codex
```

Other install targets are `claude`, `qwen`, `copilot`, and `all`. To inspect or share an export without installing into an assistant's configuration, use:

```powershell
node bin/xppai-365.js export --target generic --out ./xppai-365-export
```

Exports are also available for `claude`, `codex`, `qwen`, and `copilot`. Install and export default to copying files; the optional `--mode symlink` keeps assets linked to this package's location. `generic` is export-only. See the [CLI guide](docs/cli.md) for destination paths and ownership behavior.

After installing or exporting, give your assistant the relevant source and ask for a specific result. For example:

> Use `xppai-365-codefix` to correct this method. Return the complete method and identify its element and application point in Visual Studio.

## Scope and limits

- Works from evidence you provide, such as pasted X++, readable source files, metadata XML, diffs, diagnostics, traces, and requirements.
- Produces explanations, complete methods or classes when the evidence supports them, focused diffs, design guidance, and precise metadata application steps.
- Does not parse binary `.axpp`, `.axmodel`, or deployment archives, or guarantee archive round-tripping. Provide the relevant readable source instead.
- Does not compile X++, synchronize a database, deploy changes, automate Visual Studio, connect to a D365FO environment, or run an AI model. The CLI installs and exports assistant guidance; analysis happens in the assistant you use.
- A code suggestion or package test is not proof of successful D365FO compilation or runtime behavior. Verify those in the target development environment.

## Documentation

- [Skills and evidence](docs/skills.md)
- [CLI](docs/cli.md)
- [Validation and recorded checks](docs/validation.md)
- [Response evaluation](docs/response-evaluation.md)
- [Repository overview and product comparison](../../README.md)

The package requires Node.js 18 or newer. Its local package metadata defines the CLI and validation scripts; these commands do not imply that the package is published to npm.
