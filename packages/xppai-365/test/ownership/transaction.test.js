'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { useTempDir } = require('../helpers/tmp');
const { snapshotTree } = require('../helpers/hash-tree');
function setup(t, mode='copy') {
 const {buildInstallPlan,applyInstallPlan}=require('../../src/ownership/transaction');
 const root=useTempDir(t), source=path.join(root,'source'), dest=path.join(root,'dest');
 fs.mkdirSync(path.join(source,'skills/xppai-365-core'),{recursive:true});
 fs.writeFileSync(path.join(source,'skills/xppai-365-core/SKILL.md'),'v1');
 fs.mkdirSync(path.join(source,'references'));
 fs.writeFileSync(path.join(source,'references/manifest.json'),'{}');
 const plan=()=>buildInstallPlan({assetRoot:source,destinations:{skills:dest},target:'codex',mode,version:'0.1.0'});
 return {root,source,dest,plan,apply:applyInstallPlan};
}
test('repeated install and upgrade replace only unchanged owned entries',t=>{
 const c=setup(t); c.apply(c.plan()); c.apply(c.plan());
 fs.writeFileSync(path.join(c.source,'skills/xppai-365-core/SKILL.md'),'v2');
 c.apply(c.plan());
 assert.equal(fs.readFileSync(path.join(c.dest,'xppai-365-core/SKILL.md'),'utf8'),'v2');
});
for(const mode of ['copy','symlink']) for(const failAt of ['activation','manifest-write','after-manifest-write']) {
 test(mode+' rollback on '+failAt,t=>{
  const c=setup(t,mode); c.apply(c.plan()); const before=snapshotTree(c.dest);
  assert.throws(()=>c.apply(c.plan(),{failAt}),/simulated/);
  assert.deepEqual(snapshotTree(c.dest),before);
 });
}
test('unowned directory collision is preserved',t=>{
 const c=setup(t); fs.mkdirSync(path.join(c.dest,'xppai-365-core'),{recursive:true});
 fs.writeFileSync(path.join(c.dest,'xppai-365-core/custom'),'mine');
 const before=snapshotTree(c.dest);
 assert.throws(()=>c.apply(c.plan()),/unowned.*collision/i); assert.deepEqual(snapshotTree(c.dest),before);
});
test('local copy edits block upgrade without mutation',t=>{
 const c=setup(t); c.apply(c.plan());
 fs.writeFileSync(path.join(c.dest,'xppai-365-core/SKILL.md'),'local');
 const before=snapshotTree(c.dest);
 assert.throws(()=>c.apply(c.plan()),/changed|modified/i); assert.deepEqual(snapshotTree(c.dest),before);
});
test('unowned dangling junction is never replaced',t=>{
 const c=setup(t); fs.mkdirSync(c.dest);
 fs.symlinkSync(path.join(c.root,'absent'),path.join(c.dest,'xppai-365-core'),'junction');
 const before=snapshotTree(c.dest);
 assert.throws(()=>c.apply(c.plan()),/unowned.*collision/i); assert.deepEqual(snapshotTree(c.dest),before);
});
test('owned dangling junction fails without mutation',t=>{
 const c=setup(t,'symlink'); c.apply(c.plan());
 fs.renameSync(path.join(c.source,'skills/xppai-365-core'),path.join(c.source,'skills/xppai-365-moved'));
 const before=snapshotTree(c.dest);
 assert.throws(()=>c.apply(c.plan())); assert.deepEqual(snapshotTree(c.dest),before);
});
test('upgrade retires only previous owned entries',t=>{
 const c=setup(t); c.apply(c.plan());
 fs.writeFileSync(path.join(c.dest,'other.txt'),'keep');
 fs.renameSync(path.join(c.source,'skills/xppai-365-core'),path.join(c.source,'skills/xppai-365-renamed'));
 c.apply(c.plan());
 assert.equal(fs.existsSync(path.join(c.dest,'xppai-365-core')),false);
 assert.equal(fs.readFileSync(path.join(c.dest,'other.txt'),'utf8'),'keep');
});
for(const kind of ['json','foreign','traversal','duplicate','nested','invalid-kind']) {
 test('rejects '+kind+' ownership before touching files',t=>{
  const c=setup(t); c.apply(c.plan());
  const file=path.join(c.dest,'.xppai-365-owned.json');
  const m=JSON.parse(fs.readFileSync(file));
  if(kind==='foreign') m.package='xppai-ax2012';
  if(kind==='traversal') m.entries[0].path='../outside';
  if(kind==='duplicate') m.entries.push(m.entries[0]);
  if(kind==='nested') m.entries[0].path='xppai-365-core/nested';
  if(kind==='invalid-kind') m.entries[0].kind='anything';
  fs.writeFileSync(file,kind==='json'?'not json':JSON.stringify(m));
  const before=snapshotTree(c.dest);
  assert.throws(()=>c.apply(c.plan()),/manifest|invalid|namespace|duplicate/);
  assert.deepEqual(snapshotTree(c.dest),before);
 });
}
test('copy ownership does not authorize a substituted symlink',t=>{
 const c=setup(t); c.apply(c.plan());
 const core=path.join(c.dest,'xppai-365-core');
 fs.renameSync(core,path.join(c.dest,'original'));
 fs.symlinkSync(path.join(c.dest,'original'),core,'junction');
 const before=snapshotTree(c.dest);
 assert.throws(()=>c.apply(c.plan()),/changed|symbolic|link/i);
 assert.deepEqual(snapshotTree(c.dest),before);
});
