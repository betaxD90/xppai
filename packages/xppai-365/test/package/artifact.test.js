'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const test=require('node:test');
const {useTempDir}=require('../helpers/tmp');
const root=path.resolve(__dirname,'../..');
test('packed package runs independently with all target references',()=>{
 const {verifyInstalledArtifact}=require('../../scripts/verify-artifact');
 assert.doesNotThrow(()=>verifyInstalledArtifact(root));
});
test('missing reference is rejected before claiming an artifact is usable',t=>{
 const {verifyInstalledArtifact}=require('../../scripts/verify-artifact');
 const fixture=useTempDir(t);
 for(const name of ['assets','bin','src','docs','scripts','package.json','README.md','LICENSE'])
  fs.cpSync(path.join(root,name),path.join(fixture,name),{recursive:true});
 fs.unlinkSync(path.join(fixture,'assets/references/platform/batch.md'));
 assert.throws(()=>verifyInstalledArtifact(fixture),/missing reference/);
});
test('release scripts cannot recurse during artifact verification',()=>{
 const pkg=require('../../package.json');
 assert.equal(pkg.scripts.prepack,'npm test');
 assert.equal(pkg.scripts.prepublishOnly,'npm test && npm run verify:artifact');
 assert.equal(pkg.scripts['verify:artifact'],'node scripts/verify-artifact.js');
});
