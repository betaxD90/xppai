# CLI

- `list`: exact nine skill names; `path`: canonical bundled skill directory.
- `--help`, `--version`: usage and package version.
- `install --target <claude|codex|qwen|copilot|all> [--mode copy|symlink]`: defaults to copy.
- `export --target <claude|codex|qwen|copilot|generic> --out <directory> [--mode copy|symlink]`: output stays below the requested directory.

Claude uses the user's .claude/skills and .claude/commands; Codex .codex/skills; Qwen .qwen/skills. Copilot uses .github/skills in the current project. Generic is export-only. Every target receives the xppai-365-references bundle beside its skills.

Each target has a .xppai-365-owned.json manifest. Upgrades replace or retire only unchanged owned entries; local edits and unowned collisions stop installation. Failures roll back the current target. With --target all, previously completed targets remain installed if a later target fails.

Symlink mode requires the source package to remain at its current location. Windows directory links use junctions; command-file links require symlink support. A failed symlink operation is reported and rolled back, not silently converted to copy.

The CLI distributes skills; it does not accept X++ for analysis, parse archives, connect to D365FO, or run a model. Provide source to your assistant after installing/exporting the skills.
