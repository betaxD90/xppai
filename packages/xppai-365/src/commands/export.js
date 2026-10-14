'use strict';

const fs = require('node:fs');
const path = require('node:path');
const assets = require('../assets');
const { applyInstallPlan, buildInstallPlan } = require('../ownership/transaction');
const { loadTarget } = require('../targets');
const packageVersion = require('../../package.json').version;

function validateExportDestinations(outDir, destinations) {
  const root = path.resolve(String(outDir));
  // The explicitly selected output root may be redirected; its descendants may not.
  // Check every layout before the transaction can create directories or stage files.
  for (const destination of Object.values(destinations)) {
    const relative = path.relative(root, destination);
    if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
      throw new Error('export destination escapes output root');
    }
    let current = root;
    for (const component of relative.split(path.sep).filter(Boolean)) {
      current = path.join(current, component);
      let stat;
      try { stat = fs.lstatSync(current); }
      catch (error) {
        if (error.code === 'ENOENT') break;
        throw error;
      }
      if (stat.isSymbolicLink()) throw new Error(`export destination contains a symbolic link: ${current}`);
      if (!stat.isDirectory()) throw new Error(`export destination is not a directory: ${current}`);
    }
  }
}

function exportCommand(flags, _positionals, context = {}) {
  const targetId = flags['--target'];
  const outDir = flags['--out'];
  if (!targetId || targetId === true) throw new Error('export requires --target');
  if (!outDir || outDir === true) throw new Error('export requires --out');
  const mode = flags['--mode'] || 'copy';
  const adapter = loadTarget(String(targetId));
  const destinations = adapter.resolveExportDestinations(outDir);
  validateExportDestinations(outDir, destinations);
  const plan = buildInstallPlan({
    assetRoot: context.assetRoot || assets.root(),
    destinations,
    target: String(targetId),
    mode,
    version: packageVersion,
  });
  const manifest = applyInstallPlan(plan, context.transactionOptions);
  const result = { target: String(targetId), outDir: path.resolve(String(outDir)), destinations, manifest };
  if (!context.quiet) process.stdout.write(`exported ${targetId} to ${result.outDir}\n`);
  return result;
}

module.exports = exportCommand;
