# xppai-ax2012

**X++ guidance for Microsoft Dynamics AX 2012 R3.**

## Pick the right generation first

| Your system | Package and scope |
| --- | --- |
| **Microsoft Dynamics AX 2009** | [xppai AX 2009](../../docs/ax2009.md): legacy X++ analysis, support and posting investigations, change review, and XPO inspection. |
| **Microsoft Dynamics AX 2012 R3** | This package: AX 2012 R3 analysis, change guidance, project notes, and XPO tooling. |
| **Dynamics 365 Finance and Supply Chain Management (D365FO)** | [xppai-365](../xppai-365/README.md): D365FO X++ and readable metadata, diffs, diagnostics, and requirements. |

Each package has its own skills, CLI, and installation. This one has its own XPO cache and install manifests too. It installs side-by-side with xppai for AX 2009. This package does not provide AX 2009 or D365 guidance. Keep the evidence and guidance tied to the version you actually use.

## What this AX 2012 package does

Bring an R3 method, class, XPO, error, or change request. The assistant can explain the behavior shown by that evidence, examine design and regression risks, and help shape a fix or new artifact. If the work needs a paper trail, the project workflow creates local notes and documents on request.

The CLI handles the mechanical XPO work: load source, take a snapshot, find or read objects, and compare selected revisions. That makes it easier to point the assistant at the right evidence.

## Meet `xppai-ax2012-papai`

**Papai leads the AX 2012 investigation.** Give it a mixed or unclear R3 request, plus the X++ or XPO you have. It establishes the AX 2012 baseline, reads XPO evidence once when present, selects only the relevant reference material, and brings in the smallest useful sequence of `explain`, `architect`, `risk`, `codefix`, or `dev`. Then it checks what those findings really support and gives you one useful answer.

Its superpower is keeping a many-part problem together without sending every question through every skill. It knows when a domain needs more evidence and when the honest answer is `Unknown`. You can use a specialist directly for a clear, narrow task; Papai is the first stop when several kinds of work meet. `xppai-ax2012-project` handles local project notes when you need them.

> **Try it:** “Use `xppai-ax2012-papai` to review this R3 XPO change. Explain the behavior, identify the change risk, and tell me what must be checked in AX before deployment.”

## The AX 2012 crew

| Skill | What it does |
| --- | --- |
| `xppai-ax2012-papai` | Orchestrates mixed R3 work and synthesizes the specialist findings. |
| `xppai-ax2012-explain` | Explains existing X++ objects and behavior from the supplied evidence. |
| `xppai-ax2012-architect` | Reviews or designs boundaries and interactions. |
| `xppai-ax2012-risk` | Assesses change, regression, and deployment risk. |
| `xppai-ax2012-codefix` | Corrects defective existing behavior. |
| `xppai-ax2012-dev` | Designs new behavior or AX artifacts from requirements. |
| `xppai-ax2012-project` | Creates local project notes and applies the documentation tag policy. |
| `xppai-ax2012-core` | Supplies the shared R3 baseline and evidence rules. |
| `xppai-ax2012-intake` | Organizes supplied evidence and handles XPO intake once. |
| `xppai-ax2012-help` | Explains the catalog, references, and routing. |

The CLI uses a byte-preserving parser and local, append-only revision cache. The [skills and references guide](docs/skills.md) explains which domains are supported, gated, or deferred. A missing reference or unmet gate means an explicit evidence gap.

Parsed source or XPO supports static analysis, not proof of what runs in AX. Layer/model state, xRef, subscribers, build and hotfix level, deployment, company, identity, and execution path remain unknown unless evidence establishes them. Import, compile, CIL generation, database synchronization, deployment, and runtime behavior need confirmation in the target AX environment.

## Install and start

Node.js 18 or newer is required. Install the Codex skills with one command:

```powershell
npx --yes xppai-ax2012@latest install --target codex
```

To keep the CLI available globally, install it with:

```powershell
npm install -g xppai-ax2012
xppai-ax2012 install --target codex
```

Install for a different supported runtime by replacing `codex` with `claude`, `qwen`, or `copilot`. `generic` is available for export only. The CLI also supports copying or symlinking assets and exporting them to a chosen directory.

To work from a source checkout instead, run these commands from `packages/xppai-ax2012/`:

```powershell
npm ci
node bin/xppai-ax2012.js --help
npm test
```

## Common workflows

### Skills and installations

```powershell
xppai-ax2012 list
xppai-ax2012 path
xppai-ax2012 install --target codex --mode copy
xppai-ax2012 export --target generic --out C:\xppai-export
```

`list` and `path` inspect the package assets. Installs are transactional and track package-owned files in a manifest. Exports stay below the requested output directory.

### Inspect XPO evidence

```powershell
xppai-ax2012 xpo load C:\AX\Demo.xpo
xppai-ax2012 xpo snapshot --source C:\AX\Demo.xpo
xppai-ax2012 xpo list
xppai-ax2012 xpo read --type Class --name Demo
xppai-ax2012 xpo grep --contains posting
```

Use `xpo load-stdin` to load pasted or piped XPO content. `xpo export-modified` compares revisions only when you supply both `--base` and `--head`; it reports added, modified, and removed objects. For cache location and authorization details, see [XPO cache](docs/xpo-cache.md).

### Create project notes

Use the `xppai-ax2012-project` skill for conversational project setup. The CLI also provides `project init` and `project document` for explicit, scriptable setup; see [CLI reference](docs/cli.md) for required options and supported document stages.

## Documentation

- [CLI commands and examples](docs/cli.md)
- [Skills and reference coverage](docs/skills.md)
- [XPO cache and evidence handling](docs/xpo-cache.md)
- [Targets, installation, and ownership](docs/targets.md)
- [Release and package boundaries](docs/release.md)
- [Repository overview](../../README.md)
