'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const PACKAGE_ROOT = path.resolve(__dirname, '../..');
const SKILL_NAME = 'xppai-ax2012-project';
const SKILL_PATH = path.join(PACKAGE_ROOT, 'assets', 'skills', SKILL_NAME, 'SKILL.md');
const COMMAND_PATH = path.join(PACKAGE_ROOT, 'assets', 'commands', `${SKILL_NAME}.md`);

test('project workspace skill provides the AX 2012 conversational contract', () => {
  assert.equal(fs.existsSync(SKILL_PATH), true);
  const content = fs.readFileSync(SKILL_PATH, 'utf8');

  assert.match(content, /^---[\s\S]*name:\s*xppai-ax2012-project\s*$/m);
  assert.match(content, /Microsoft Dynamics AX 2012 R3/);
  assert.match(content, /xppai-ax2012-core/);
  assert.match(content, /company tag[\s\S]*project name[\s\S]*developer name[\s\S]*objective/i);
  assert.match(content, /classDeclaration/);
  assert.match(content, /every newly created method/i);
  assert.match(content, /overlap|ambiguous/i);
  assert.match(content, /create only that document/i);
});

test('project workspace command routes to the installed skill', () => {
  assert.equal(fs.existsSync(COMMAND_PATH), true);
  assert.match(fs.readFileSync(COMMAND_PATH, 'utf8'), /xppai-ax2012-project/);
});
