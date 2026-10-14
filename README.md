# XppAI

**Practical, evidence-aware X++ assistance for three distinct Microsoft Dynamics generations.**

XppAI is a family of independent assistant skill suites. Choose the package that matches the system you are working on; each has its own scope, CLI, assets, and installation lifecycle.

## Choose your product

| Product | Use it for | What it provides |
|---|---|---|
| **AX 2009** — this package | Microsoft Dynamics AX 2009 and its X++ codebase | Analysis and review skills, posting and performance guidance, risk assessment, and XPO inspection utilities. |
| **AX 2012 R3** | Microsoft Dynamics AX 2012 R3 | A separate suite for evidence-driven analysis, development guidance, project workflows, and XPO tooling. |
| **Dynamics 365 Finance & Operations (D365FO)** | Current Finance and Supply Chain Management X++ work | A separate suite for explaining, reviewing, and proposing X++ changes from supplied code, metadata, diffs, requirements, and diagnostics. |

These products are installed and used independently. The root `xppai` CLI and its AX 2009 assets do not provide the AX 2012 or D365FO skill catalogs. See the dedicated guides for [AX 2012 R3](packages/xppai-ax2012/README.md) and [D365FO](packages/xppai-365/README.md).

## AX 2009: what it does

This repository-root package is the AX 2009 product. Its skills help an AI assistant reason about legacy X++ with explicit evidence, conservative change boundaries, and production-aware context. Use them to:

- explain unfamiliar classes, methods, forms, and tables;
- triage mixed or unclear issues, or follow a predictable analysis flow;
- review architecture and assess change risk before implementation;
- investigate profiler and stack traces, posting behavior, and business-error symptoms;
- propose focused, behavior-preserving fixes; and
- read XPO input for analysis or use the CLI to inventory and query cached XPO objects.

Start with `xppai-papai` for mixed or ambiguous work, or `xppai-babysit` for a structured, repeatable flow. Use focused skills such as `xppai-stack`, `xppai-posting`, `xppai-support`, `xppai-risk`, or `xppai-codefix` once the problem is scoped. The suite provides instructions to an AI assistant; it does not run AX, compile X++, connect to an AX environment, or prove that proposed changes work in a live system.

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
