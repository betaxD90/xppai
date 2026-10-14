'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
const test=require('node:test');
const {useTempDir}=require('../helpers/tmp');
const {snapshotTree}=require('../helpers/hash-tree');
const pkgRoot=path.resolve(__dirname,'../..'), repo=path.resolve(pkgRoot,'../..');
for(const target of ['claude','codex','qwen','copilot']) for(const mode of ['copy','symlink']) {
 test('real legacy installations survive 365 '+target+' '+mode+' installation/upgrade',t=>{
  const root=useTempDir(t), home=path.join(root,'home'), project=path.join(root,'project');
  fs.mkdirSync(home); fs.mkdirSync(project);
  const env={...process.env,HOME:home,USERPROFILE:home,LOCALAPPDATA:path.join(root,'local')};
  delete env.NODE_TEST_CONTEXT;
  for(const bin of [path.join(repo,'bin/xppai.js'),path.join(repo,'packages/xppai-ax2012/bin/xppai-ax2012.js')]) {
   const r=spawnSync(process.execPath,[bin,'install','--target',target,'--mode',mode],{cwd:project,env,encoding:'utf8'});
   assert.equal(r.status,0,r.stderr||r.stdout);
  }
  const before=snapshotTree(root);
  const install=require('../../src/commands/install');
  install({'--target':target,'--mode':mode},[],{homeDir:home,cwd:project,quiet:true});
  install({'--target':target,'--mode':mode},[],{homeDir:home,cwd:project,quiet:true});
  const after=snapshotTree(root);
  for(const [name,value] of Object.entries(before)) assert.deepEqual(after[name],value,name);
 });
}
test('365 research does not enter the AX2009 published docs glob',()=>{
 const expected=require(path.join(repo,'packages/xppai-ax2012/test/fixtures/ax2009-baseline.json')).packageFiles.filter(p=>p.startsWith('docs/') && p.endsWith('.md')).sort();
 const actual=fs.readdirSync(path.join(repo,'docs')).filter(p=>p.endsWith('.md')).map(p=>'docs/'+p).sort();
 assert.deepEqual(actual,expected);
});
