# CLI

Run `xppai-ax2012 --help` or `xppai-ax2012 --version`. Successful commands use exit code 0; invalid input, rejected identity, authorization failure, or unsafe mutation returns a non-zero exit code with a corrective diagnostic.

## Assets and targets

- `xppai-ax2012 list` lists canonical public skill directories.
- `xppai-ax2012 path` prints the canonical skills path.
- `xppai-ax2012 install --target codex --mode copy` installs to one target. Targets are `claude`, `codex`, `qwen`, and `copilot`; `--target all` installs all four. Modes are `copy` and `symlink`.
- `xppai-ax2012 export --target generic --out C:\synthetic\export --mode copy` exports below `--out`. Export also supports the installable targets.

## XPO

Every XPO command accepts `--cache-dir` to select an isolated cache. Load commands also accept `--baseline`, `--layer`, `--model`, `--build`, and `--json`.

- `xppai-ax2012 xpo load C:\synthetic\Demo.xpo --cache-dir C:\synthetic\cache` parses a local file and appends a revision.
- `Get-Content -Raw C:\synthetic\Demo.xpo | xppai-ax2012 xpo load-stdin --cache-dir C:\synthetic\cache` preserves stdin bytes through the same parser.
- `xppai-ax2012 xpo snapshot --source C:\synthetic\Demo.xpo [--revision <id>] [--json]` authorizes bounded queries for the current index fingerprint.
- `xppai-ax2012 xpo list [--revision <id>] [--json]` lists authorized objects.
- `xppai-ax2012 xpo read --type Class --name Demo [--revision <id>] [--json]` reads one authorized object.
- `xppai-ax2012 xpo grep --contains posting [--revision <id>] [--json]` searches authorized object content.
- `xppai-ax2012 xpo export-modified --source C:\synthetic\Demo.xpo --base <id> --head <id> --out C:\synthetic\diff [--json]` exports explicit added/modified objects plus removal and comparison manifests.

`export-modified` never chooses implicit base/head revisions. Query authorization expires when the append-only index changes; create a new snapshot for the new fingerprint.

## Project workspace

Use the installed `xppai-ax2012-project` skill for conversational setup. Its scriptable CLI surface is intentionally non-interactive:

- `xppai-ax2012 project init --root C:\AX\InvoiceSettlement --create-root --company-tag FGL --project-name InvoiceSettlement --developer t_robertaoliveira --objective "Record vendor invoice settlement changes"` creates only the requested root and `.xppai-ax2012.json`.
- `xppai-ax2012 project document --root C:\AX\InvoiceSettlement --stage action-plan` creates only the requested stage document. Supported stages are `action-plan`, `code-review`, `technical-changes`, `functional-summary`, and `test-plan`.

The configuration stores the company tag, project name, developer name, and objective. New documentation markers use the local date; existing markers are preserved. The command rejects missing configuration, unsupported stages, and unsafe input with a non-zero exit.
