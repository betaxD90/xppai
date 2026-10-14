'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { useTempDir } = require('../helpers/tmp');
const { snapshotTree } = require('../helpers/hash-tree');
for(const [target,relative] of [
 ['claude','skills'],['claude','commands'],['codex','skills'],['qwen','skills'],
 ['generic','skills'],['generic','commands'],['copilot','.github'],['copilot','.github/skills'],
]) test(target+' export rejects redirected '+relative+' before writing',t=>{
 const root=useTempDir(t), out=path.join(root,'out'), outside=path.join(root,'outside');
 const redirected=path.join(out,relative);
 fs.mkdirSync(path.dirname(redirected),{recursive:true}); fs.mkdirSync(outside);
 fs.symlinkSync(outside,redirected,'junction');
 const before=snapshotTree(root);
 assert.throws(()=>require('../../src/commands/export')({'--target':target,'--out':out},[],{quiet:true}),/export.*symbolic link|export.*redirect/i);
 assert.deepEqual(snapshotTree(root),before);
});
for (const target of ['claude','codex','qwen','copilot','generic']) for (const mode of ['copy','symlink']) {
 test(target+' '+mode+' export resolves all references under output',t => {
  const exportCommand = require('../../src/commands/export');
  const root=useTempDir(t), out=path.join(root,'output with spaces');
  const result=exportCommand({'--target':target,'--out':out,'--mode':mode},[],{quiet:true});
  for (const dest of Object.values(result.destinations)) assert.ok(!path.relative(out,dest).startsWith('..'));
  const refs=path.join(result.destinations.skills,'xppai-365-references');
  const manifest=JSON.parse(fs.readFileSync(path.join(refs,'manifest.json')));
  for (const ref of manifest.references) assert.ok(fs.existsSync(path.join(refs,ref.path)));
  assert.equal(fs.lstatSync(refs).isSymbolicLink(), mode==='symlink');
  assert.equal(fs.existsSync(path.join(root,'.codex')),false);
 });
}
for (const target of ['claude','codex','qwen','copilot']) for (const mode of ['copy','symlink']) {
 test(target+' '+mode+' install uses injected home/project',t => {
  const install = require('../../src/commands/install');
  const root=useTempDir(t), homeDir=path.join(root,'home'), cwd=path.join(root,'project');
  const result=install({'--target':target,'--mode':mode},[],{homeDir,cwd,quiet:true})[0];
  assert.ok(result.destinations.skills.startsWith(target==='copilot'?cwd:homeDir));
  assert.ok(fs.existsSync(path.join(result.destinations.skills,'xppai-365-core/SKILL.md')));
 });
}
test('install all covers four targets with separate manifests',t => {
 const install=require('../../src/commands/install');
 const root=useTempDir(t);
 assert.equal(install({'--target':'all'},[],{homeDir:root,cwd:root,quiet:true}).length,4);
});
