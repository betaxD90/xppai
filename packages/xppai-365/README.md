# xppai-365

D365FO X++ assistance: provide code, metadata, a diff, an error, or requirements to your assistant and receive an explanation or applicable code. No customer database/environment connection is required or provided.

This independent package includes nine skills, seven focused references, and a local installation/export CLI. Analysis happens in the assistant runtime. Visual Studio application guidance is included; this package does not compile X++ or automate Visual Studio.

From this package directory:

```powershell
node bin/xppai-365.js list
node bin/xppai-365.js export --target codex --out ./exported-skills
node bin/xppai-365.js install --target codex
npm test
```

Installation writes to the selected assistant configuration; use export to inspect the assets first. No npm publication is implied by these local commands.

Choose `xppai-365-codefix` for defects, `dev` for new behavior, `explain` for existing code, or `papai` for mixed work. For example: “Use xppai-365-codefix to correct this method; return the complete method and where to apply it in Visual Studio.”

See [CLI](docs/cli.md), [skills](docs/skills.md), and [validation](docs/validation.md). AX 2009 and AX 2012 remain separate products. No Ririchard/Frigelar rules, XPO/cache utilities, archive converter, model API client, or live-system connector is included.
