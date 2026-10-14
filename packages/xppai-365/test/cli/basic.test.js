'use strict';
const assert = require('node:assert/strict');
const test = require('node:test');
const { runCli, PACKAGE_ROOT } = require('../helpers/cli');
const path = require('node:path');
test('CLI exposes four commands and no XPO subsystem', () => {
 const r = runCli(['--help']); assert.equal(r.status,0,r.stderr);
 assert.match(r.stdout,/list, path, install, export/); assert.doesNotMatch(r.stdout,/\bxpo\b/i);
 assert.equal(runCli(['--version']).stdout.trim(),'0.1.0');
 assert.equal(runCli(['list']).stdout.trim().split(/\r?\n/).length,9);
 assert.equal(runCli(['path']).stdout.trim(),path.join(PACKAGE_ROOT,'assets/skills'));
});
for (const args of [[],['xpo'],['install'],['export','--target','codex'],['install','--target','generic'],['install','--target','bogus'],['install','--target','codex','--mode','bogus'],['list','--bogus'],['install','--target','codex','--mode'],['list','extra']]) {
 test('CLI rejects '+JSON.stringify(args), () => { const r=runCli(args); assert.notEqual(r.status,0); assert.doesNotMatch(r.stderr,/UnhandledPromiseRejection|Cannot find module/); });
}
