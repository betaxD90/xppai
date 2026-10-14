'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { useTempDir } = require('../helpers/tmp');
const root = path.resolve(__dirname, '../..');
const expected = ['core','intake','papai','explain','architect','risk','codefix','dev','help'].map(s => 'xppai-365-' + s).sort();
test('ships exactly nine independent D365FO skills with matching frontmatter', () => {
  const { validateSkillContracts } = require('../../src/skills/contracts');
  const assets = require('../../src/assets');
  assert.deepEqual(assets.list().sort(), expected);
  assert.deepEqual(validateSkillContracts(root).sort(), expected);
});
test('rejects foreign or extra skills and invalid frontmatter', t => {
  const { validateSkillContracts } = require('../../src/skills/contracts');
  const fixture = useTempDir(t);
  fs.cpSync(path.join(root, 'assets'), path.join(fixture, 'assets'), { recursive:true });
  const skill = path.join(fixture, 'assets/skills/xppai-365-dev/SKILL.md');
  const original = fs.readFileSync(skill, 'utf8');
  fs.writeFileSync(skill, original.replace('name: xppai-365-dev', 'name: wrong'));
  assert.throws(() => validateSkillContracts(fixture), /frontmatter/);
  fs.writeFileSync(skill, original);
  fs.mkdirSync(path.join(fixture, 'assets/skills/xppai-ax2012-extra'));
  assert.throws(() => validateSkillContracts(fixture), /catalog|namespace/);
});
test('all source-tree reference paths resolve and seven command wrappers target bundled skills', () => {
  const assets = require('../../src/assets');
  for (const name of expected) {
    const directory = path.join(assets.path(), name);
    const text = fs.readFileSync(path.join(directory, 'SKILL.md'), 'utf8');
    assert.ok(text.includes('../../references/manifest.json'), name);
    assert.ok(text.includes('../xppai-365-references/manifest.json'), name);
    assert.ok(fs.existsSync(path.resolve(directory, '../../references/manifest.json')));
  }
  const commands = fs.readdirSync(assets.commandsPath());
  assert.equal(commands.length, 7);
  for (const file of commands) assert.ok(expected.includes(path.basename(file, '.md')));
});
