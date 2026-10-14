# xppAI

**X++ assistance across AX 2009, AX 2012 R3, and Dynamics 365 Finance and Supply Chain Management.**

xppAI gives an AI assistant version-specific guidance for working with Microsoft ERP code. You provide the relevant X++, XPO, readable metadata, diagnostics, or requirements; the assistant uses that evidence to help you understand the system and decide what to do next. The repository contains three independent packages, so each generation keeps its own rules and tools.

## What xppAI can help with

- **Understand existing behavior:** explain X++ objects, methods, and the relationships visible in the supplied evidence.
- **Investigate problems:** connect errors, support symptoms, posting flows, traces, or performance clues to the relevant code when the version supports that workflow.
- **Plan a change:** review design boundaries, likely impact, and regression risks before editing.
- **Work on code:** propose a focused fix or draft new behavior within the capabilities of the selected package.
- **Handle version-specific evidence:** inspect XPOs in the AX 2009 and AX 2012 tools, or work from readable source and metadata in D365FO.

Each package has a **Papai** skill for requests that mix several kinds of work. Papai chooses the useful specialists, combines their findings, and stops when the evidence runs out. You can also call a specialist directly for a focused question. xppAI guides an assistant; its CLI installs the guidance and handles supported local file workflows. It does not compile, deploy, or verify changes in a running ERP environment.

## Choose your version

| System | Best fit | Detailed guide |
| --- | --- | --- |
| **Microsoft Dynamics AX 2009** | Legacy X++ analysis, support and posting investigations, performance, risk, fixes, and XPO inspection. | [AX 2009 guide](docs/ax2009.md) |
| **Microsoft Dynamics AX 2012 R3** | R3 X++ and XPO analysis, change guidance, project notes, and revision-aware XPO tooling. | [AX 2012 R3 guide](packages/xppai-ax2012/README.md) |
| **Dynamics 365 Finance and Supply Chain Management (D365FO)** | X++ and readable metadata, diffs, diagnostics, extension design, fixes, and new behavior. | [D365FO guide](packages/xppai-365/README.md) |

Choose the package for the system you are actually using. A similar X++ name does not make guidance from another generation interchangeable.

## Install from npm

Node.js 18 or newer is required. Once each package has been published, install its guidance for Codex with one command:

| System | Command |
| --- | --- |
| AX 2009 | `npx --yes xppai@latest install --target codex` |
| AX 2012 R3 | `npx --yes xppai-ax2012@latest install --target codex` |
| D365FO | `npx --yes xppai-365@latest install --target codex` |

The first run downloads the package from npm. Each command copies that version's skills into Codex; repeat it to install a newer published version. AX 2012 and D365FO need their first npm release before their commands work. The published AX 2009 version may lag behind this repository.

## Install from this repository

Node.js 18 or newer is required. Clone the repository, then run **one** install command from its root for the version you need:

```powershell
git clone https://github.com/betaxD90/xppai.git
cd xppai
```

| System | Install skills for Codex |
| --- | --- |
| AX 2009 | `node .\bin\xppai.js install --target codex` |
| AX 2012 R3 | `node .\packages\xppai-ax2012\bin\xppai-ax2012.js install --target codex` |
| D365FO | `node .\packages\xppai-365\bin\xppai-365.js install --target codex` |

The package guides explain other assistant targets, global installation, export, and package-specific CLI commands. After installing, give your assistant the relevant evidence and describe the result you want. Start with that version's Papai when the request spans explanation, design, risk, and implementation.

## About

Created by **Roberta Freitas Oliveira**, Microsoft ERP specialist. [LinkedIn](https://www.linkedin.com/in/rfreitas90/)
