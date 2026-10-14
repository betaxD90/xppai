# XppAI

**Three X++ generations, each with its own toolkit.**

## Pick the right generation first

| Your system | Package and scope |
| --- | --- |
| **Microsoft Dynamics AX 2009** | This root package: legacy X++ analysis, support and posting investigations, change review, and XPO inspection. |
| **Microsoft Dynamics AX 2012 R3** | [xppai-ax2012](packages/xppai-ax2012/README.md): AX 2012 R3 analysis, change guidance, project notes, and XPO tooling. |
| **Dynamics 365 Finance and Supply Chain Management (D365FO)** | [xppai-365](packages/xppai-365/README.md): D365FO X++ and readable metadata, diffs, diagnostics, and requirements. |

Each package has its own skills, CLI, and installation. Pick the version of the system you are actually working on; a familiar X++ name does not make guidance from another generation safe to reuse.

## What each version actually does

- **AX 2009** helps untangle older X++ systems: explain an unfamiliar object, trace a posting or support problem, read a profiler result, review a proposed fix, or inspect an XPO. This is the package documented below.
- **AX 2012 R3** works with R3 X++ and XPO evidence to explain existing behavior, plan or review changes, assess risk, and organize local project notes. Its separate CLI can load and compare XPO revisions. [Read the AX 2012 guide](packages/xppai-ax2012/README.md).
- **D365FO** works from readable X++, metadata, diffs, errors, traces, and requirements. It helps explain current code, choose an extension approach, assess risk, and draft a fix or new behavior. [Read the D365FO guide](packages/xppai-365/README.md).

Each guide explains what evidence its version needs and what must still be checked in the target environment.

## Meet `xppai-papai`

For AX 2009, **Papai is the lead**. Hand it a method, class, form, XPO, stack trace, posting puzzle, or support symptom and tell it what you need. It works out what matters, picks the smallest useful sequence of specialist skills, checks the evidence, and turns the findings into a practical answer. It can move from a vague business symptom to `xppai-support`, then to `xppai-posting` or `xppai-explain` when the code arrives, without making you guess the route up front.

That is why Papai is the one to call when the request is messy: it **connects the specialists and judges when to stop**. It is not a magic AX connection. The assistant still needs the relevant code or evidence, and only the AX environment can confirm compile and runtime behavior. For a narrow question, you can call a specialist directly. For a fixed, repeatable analysis of an artifact, `xppai-babysit` is also available.

> **Try it:** “Use `xppai-papai` to investigate this AX 2009 posting error. Here is the message and the relevant X++ method; explain the likely cause and the next check.”

## The AX 2009 crew

| Skill | What it does |
| --- | --- |
| `xppai-papai` | Leads mixed or unclear work and combines the right specialist findings. |
| `xppai-babysit` | Runs a predefined, structured analysis based on the artifact type. |
| `xppai-explain` | Explains unfamiliar methods, classes, forms, and tables. |
| `xppai-support` | Investigates business or support symptoms before the code path is known. |
| `xppai-stack` | Reads stack and profiler traces to investigate performance. |
| `xppai-posting` | Follows FormLetter posting flows, sequencing, and side effects. |
| `xppai-architect` | Reviews responsibilities, coupling, and design boundaries. |
| `xppai-risk` | Assesses the impact of a proposed change. |
| `xppai-codefix` | Proposes a focused fix once the defect and context are understood. |
| `xppai-exportxpo` | Prepares a ready-to-paste X++ job to export selected AOT objects. |
| `xppai-core` | Supplies AX 2009 rules and evidence labels used throughout the suite. |
| `xppai-domain` | Adds deeper posting, performance, and architecture knowledge. |
| `xppai-intake` | Reads XPO evidence once when an XPO is supplied. |
| `xppai-help` | Lists the skills and helps you choose one. |
| `xppai-init` | Legacy compatibility entry; use `core`, `domain`, and `intake` as applicable. |

The [skills guide](docs/skills.md) has more detailed routing examples. The suite guides an AI assistant; it does not run AX, compile X++, or prove a proposed change in production.

## Install and get started

### Requirements

- Node.js 18 or newer.
- A supported assistant runtime for installing the skills. The CLI also supports export for manual use.

### Install from a repository checkout

From the repository root:

```bash
npm install -g .
xppai list
xppai install --target codex
```

Choose `claude`, `qwen`, or `copilot` instead of `codex` to install to that target. `copilot` writes project skills under `.github/skills` in the current repository, so run that command from the project where you want the skills installed. To install all native targets, use `xppai install --target all`.

To export the assets for manual use instead of installing them:

```bash
xppai export --target generic --out ./out/skills
```

### Optional XPO command-line workflow

The CLI can load a local XPO into its cache and query its objects. For cache-based queries, take a snapshot before listing, reading, or searching:

```bash
xppai xpo load "./path/to/export.xpo"
xppai xpo snapshot --json
xppai xpo list --type Class
xppai xpo read --type Class --name MyClass
xppai xpo grep --contains "search text"
```

For ordinary skill analysis, the cache workflow is optional: provide the XPO file to your assistant directly when the runtime can read local files, or paste its contents.

## AX 2009 documentation

- [Skills guide](docs/skills.md)
- [CLI reference](docs/cli.md)
- [XPO cache workflow](docs/xpo-cache.md)
- [Targets and installation](docs/targets.md)
- [Scope and constraints](docs/scope.md)
- [Documentation index](docs/README.md)

## About

Created by **Roberta Freitas Oliveira**, Microsoft ERP specialist. [LinkedIn](https://www.linkedin.com/in/rfreitas90/)
