#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { PUBLIC_SKILLS } = require('../src/constants');
const { loadReferenceManifest } = require('../src/skills/manifest');
const { validateSkillContracts } = require('../src/skills/contracts');
const PACKAGE_ROOT = path.resolve(__dirname, '..');

function run(command, args, cwd) {
  const env = { ...process.env, NODE_PATH: '' };
  delete env.NODE_TEST_CONTEXT;
  const result = spawnSync(command, args, { cwd, env, encoding:'utf8', timeout:120000 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('command failed: ' + command + '\n' + (result.stderr || result.stdout));
  return result.stdout;
}
function npmCli() {
  const candidates = [
    process.env.npm_execpath,
    path.join(path.dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'),
    ...(process.env.PATH || '').split(path.delimiter).map(p => path.join(p, 'node_modules/npm/bin/npm-cli.js')),
  ];
  const found = candidates.find(p => p && p.endsWith('.js') && fs.existsSync(p));
  if (!found) throw new Error('npm CLI JavaScript entry not found; run through npm run verify:artifact');
  return found;
}
function npm(args, cwd) { return run(process.execPath, [npmCli(), ...args], cwd); }
function verifyInstalledArtifact(packageRoot = PACKAGE_ROOT) {
  validateSkillContracts(packageRoot);
  const manifest = loadReferenceManifest(packageRoot);
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'xppai-365 artifact '));
  try {
    const pack = JSON.parse(npm(['pack','--ignore-scripts','--json','--pack-destination',temp], packageRoot))[0];
    const names = new Set(pack.files.map(f => f.path.replace(/\\/g,'/')));
    for (const name of names) {
      assert.match(name, /^(?:(?:assets|bin|src|docs|scripts)\/|package\.json$|README\.md$|LICENSE$)/, 'unexpected artifact file: ' + name);
      assert.doesNotMatch(name, /(?:^|\/)(?:test|fixtures|cache|xpo|node_modules)(?:\/|$)/);
    }
    const required = ['package.json','README.md','LICENSE','bin/xppai-365.js','src/cli.js','docs/cli.md','docs/skills.md','docs/validation.md','scripts/verify-artifact.js','assets/references/manifest.json','assets/skills/xppai-365-papai/AGENT.md'];
    for (const skill of PUBLIC_SKILLS) required.push('assets/skills/'+skill+'/SKILL.md');
    for (const ref of manifest.references) required.push('assets/references/'+ref.path);
    for (const name of required) assert.ok(names.has(name), 'missing artifact file: '+name);
    const project=path.join(temp,'consumer');
    fs.mkdirSync(project);
    fs.writeFileSync(path.join(project,'package.json'),'{"private":true}\n');
    npm(['install','--offline','--ignore-scripts','--no-audit','--no-fund',path.join(temp,pack.filename)],project);
    const installed=path.join(project,'node_modules/xppai-365'), cli=path.join(installed,'bin/xppai-365.js');
    assert.equal(run(process.execPath,[cli,'--version'],project).trim(), require(path.join(packageRoot,'package.json')).version);
    assert.deepEqual(run(process.execPath,[cli,'list'],project).trim().split(/\r?\n/).sort(), [...PUBLIC_SKILLS].sort());
    assert.equal(fs.realpathSync(run(process.execPath,[cli,'path'],project).trim()),fs.realpathSync(path.join(installed,'assets/skills')));
    for (const target of ['claude','codex','qwen','copilot','generic']) {
      const out=path.join(temp,'export '+target);
      run(process.execPath,[cli,'export','--target',target,'--out',out],project);
      const skills=target==='copilot'?path.join(out,'.github/skills'):path.join(out,'skills');
      const references=path.join(skills,'xppai-365-references');
      const exported=JSON.parse(fs.readFileSync(path.join(references,'manifest.json')));
      for (const ref of exported.references) assert.ok(fs.existsSync(path.join(references,ref.path)),ref.path);
      for (const name of PUBLIC_SKILLS) {
        const text=fs.readFileSync(path.join(skills,name,'SKILL.md'),'utf8');
        assert.ok(text.includes('../xppai-365-references/manifest.json'));
        assert.ok(fs.existsSync(path.resolve(skills,name,'../xppai-365-references/manifest.json')));
      }
    }
    // Trace loaded runtime modules in a separate consumer process to detect checkout imports.
    const script = "require(process.argv[1]).run(['node','cli','list']).then(()=>{const path=require('node:path');for(const p of Object.keys(require.cache)){const r=path.relative(process.argv[2],p);if(r.startsWith('..')||path.isAbsolute(r))throw new Error('external runtime import: '+p)}})";
    run(process.execPath,['-e',script,path.join(installed,'src/cli.js'),installed],project);
    return { fileCount:names.size };
  } finally { fs.rmSync(temp,{recursive:true,force:true}); }
}
if (require.main === module) {
  try { const result=verifyInstalledArtifact(); process.stdout.write('D365FO artifact verified: '+result.fileCount+' files; five exports resolved\n'); }
  catch(error) { process.stderr.write('D365FO artifact verification failed: '+error.message+'\n'); process.exitCode=1; }
}
module.exports = { verifyInstalledArtifact };
