# xppai-ax2012

An independent skill suite and command-line tool for **Microsoft Dynamics AX 2012 R3**. It helps an AI assistant inspect X++ and XPO evidence, explain behavior, assess change risk, and plan or review implementation work using AX 2012-specific guidance.

This package has its own skills, CLI, XPO cache, install manifests, and development lifecycle. It can be installed side-by-side with xppai@1.0.24 without sharing assets or cache state. It does not provide AX 2009 or D365 implementation guidance; keep each product’s instructions and evidence separate.

## What it supports

- **Explain** X++ code and AX 2012 objects using the evidence provided.
- **Investigate** mixed or complex requests through `xppai-ax2012-papai`, which routes to explain, architecture, risk, code-fix, or development guidance.
- **Review and plan** AX 2012 changes with focused architecture, risk, code-fix, and development skills.
- **Inspect XPO files** with a byte-preserving parser and a local, append-only revision cache. Load a file or pasted content, authorize a snapshot, query objects, and compare explicitly selected revisions.
- **Set up project notes** with a small local workspace and optional stage documents.

The package applies evidence labels such as `Confirmed`, `Likely`, `Hypothesis`, and `Unknown`. Parsed source or XPO can support static analysis, but it does not prove what is effective in a running AX environment. Layer and model state, xRef, subscribers, build and hotfix level, deployment, company, identity, and execution path remain unknown unless the supplied evidence establishes them. Import, compile, CIL generation, deployment, database synchronization, and runtime behavior must be verified in the relevant AX environment.

Reference coverage is intentionally bounded: supported, gated, and deferred domains are listed in the [skills and references guide](docs/skills.md). A missing reference or unmet gate should produce an explicit evidence gap rather than borrowed guidance from another AX version.

## Install and start

Node.js 18 or newer is required. If your configured npm registry has this package, install it globally:

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
