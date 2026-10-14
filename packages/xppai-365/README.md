# xppAI 365

**X++ guidance for Dynamics 365 Finance and Supply Chain Management.**

## Pick the right generation first

| Your system | Package and scope |
| --- | --- |
| **Microsoft Dynamics AX 2009** | [xppai AX 2009](../../docs/ax2009.md): legacy X++ analysis, support and posting investigations, change review, and XPO inspection. |
| **Microsoft Dynamics AX 2012 R3** | [xppai-ax2012](../xppai-ax2012/README.md): AX 2012 R3 analysis, change guidance, project notes, and XPO tooling. |
| **Dynamics 365 Finance and Supply Chain Management (D365FO)** | This package: D365FO X++ and readable metadata, diffs, diagnostics, and requirements. |

Each package has its own skills, CLI, and installation. AX 2009 or AX 2012 material can help with an explicitly requested migration analysis; it does not establish current D365FO behavior on its own.

## What this D365FO package does

Bring readable X++, metadata XML, a diff, a diagnostic, or a requirement. The assistant can explain what the supplied code shows, help choose an extension point, assess a proposed change, correct a defect, or draft new behavior. It can return an explanation, a focused diff, a complete method or class when the evidence supports one, and the place to apply it in Visual Studio.

## Meet `xppai-365-papai`

**Papai leads when a D365FO request has several moving parts.** Give it the relevant X++, readable metadata, diff, error, trace, or requirements. It gets the shared rules and evidence in order, chooses only the relevant references, and routes the work through the smallest useful mix of `explain`, `architect`, `risk`, `codefix`, and `dev`. You get a coherent answer with the source locations and application point that matter.

Why call Papai first? It can connect “what does this do?”, “where should the extension go?”, and “what could break?” in one pass, while stopping at the edge of the supplied evidence. For one clear task, you can call its specialist directly. Papai coordinates instructions inside your assistant; it does not launch another model or need a team of agents.

> **Try it:** “Use `xppai-365-papai` to review this extension request. Here are the current method, metadata, and error. Explain the behavior, propose the change, and identify the risks.”

## The D365FO crew

| Skill | What it does |
| --- | --- |
| `xppai-365-papai` | Routes mixed work and combines the relevant specialist findings. |
| `xppai-365-explain` | Explains existing X++ and readable metadata. |
| `xppai-365-architect` | Chooses design and extension boundaries. |
| `xppai-365-risk` | Assesses the impact of a concrete change. |
| `xppai-365-codefix` | Corrects a defect in existing behavior. |
| `xppai-365-dev` | Drafts new behavior from requirements. |
| `xppai-365-core` | Supplies D365FO scope, evidence, and output rules. |
| `xppai-365-intake` | Organizes the supplied material once. |
| `xppai-365-help` | Explains the catalog and how to use it. |

The reference packs cover Visual Studio and metadata, extensibility, X++ transactions, data and integration, batch, security, and validation. See [skills and evidence](docs/skills.md) for the input and output boundaries.

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
