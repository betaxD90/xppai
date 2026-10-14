'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { useTempDir } = require('../helpers/tmp');
const root = path.resolve(__dirname, '../..');
test('loads seven domain-specific D365FO references', () => {
  const { loadReferenceManifest } = require('../../src/skills/manifest');
  const manifest = loadReferenceManifest(root);
  assert.equal(manifest.baseline, 'D365FO');
  assert.equal(manifest.references.length, 7);
  assert.deepEqual(manifest.references.map(r => r.id).sort(), ['development','extensibility','xpp-transactions','data-integration','batch','security','validation'].map(s => 'platform.'+s).sort());
});
for (const kind of ['missing', 'duplicate', 'foreign', 'traversal', 'absolute', 'bad-status']) {
  test('rejects '+kind+' reference without mutation', t => {
    const { loadReferenceManifest } = require('../../src/skills/manifest');
    const fixture = useTempDir(t);
    fs.cpSync(path.join(root, 'assets'), path.join(fixture, 'assets'), { recursive:true });
    const file = path.join(fixture, 'assets/references/manifest.json');
    const manifest = JSON.parse(fs.readFileSync(file));
    const ref = manifest.references[0];
    if (kind === 'missing') fs.unlinkSync(path.join(fixture, 'assets/references', ref.path));
    if (kind === 'duplicate') manifest.references.push(ref);
    if (kind === 'foreign') ref.baseline = '2012-R3';
    if (kind === 'traversal') ref.path = '../outside.md';
    if (kind === 'absolute') ref.path = 'C:/outside.md';
    if (kind === 'bad-status') ref.status = 'anything';
    fs.writeFileSync(file, JSON.stringify(manifest));
    const before = fs.readFileSync(file);
    assert.throws(() => loadReferenceManifest(fixture), /invalid|missing|duplicate/i);
    assert.deepEqual(fs.readFileSync(file), before);
  });
}

