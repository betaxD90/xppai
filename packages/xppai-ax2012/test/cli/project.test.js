'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { afterEach, test } = require('node:test');

const { runCli } = require('../helpers/cli');

const temporaryRoots = [];

function createTemporaryRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xppai-ax2012-project-cli-'));
  temporaryRoots.push(root);
  return root;
}

function initializationArgs(root) {
  return [
    'project', 'init', '--root', root, '--create-root',
    '--company-tag', 'FGL', '--project-name', 'InvoiceSettlement',
    '--developer', 't_robertaoliveira', '--objective', 'Record settlement changes',
  ];
}

afterEach(() => {
  while (temporaryRoots.length > 0) fs.rmSync(temporaryRoots.pop(), { recursive: true, force: true });
});

test('project init creates a named root only with explicit create-root', () => {
  const root = path.join(createTemporaryRoot(), 'InvoiceSettlement');

  const result = runCli(initializationArgs(root));

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /initialized AX 2012 project workspace/i);
  assert.equal(fs.existsSync(path.join(root, '.xppai-ax2012.json')), true);
});

test('project init rejects a missing metadata flag without creating a root', () => {
  const root = path.join(createTemporaryRoot(), 'InvoiceSettlement');
  const args = initializationArgs(root);
  args.splice(args.indexOf('--developer'), 2);

  const result = runCli(args);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /--developer/i);
  assert.equal(fs.existsSync(root), false);
});

test('project document creates one requested stage from an existing configuration', () => {
  const root = path.join(createTemporaryRoot(), 'InvoiceSettlement');
  const initialized = runCli(initializationArgs(root));
  assert.equal(initialized.status, 0, initialized.stderr);

  const result = runCli(['project', 'document', '--root', root, '--stage', 'test-plan']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /created test-plan\.md/i);
  assert.equal(fs.existsSync(path.join(root, 'test-plan.md')), true);
  assert.equal(fs.existsSync(path.join(root, 'action-plan.md')), false);
});

test('project document rejects an unknown stage without creating a file', () => {
  const root = path.join(createTemporaryRoot(), 'InvoiceSettlement');
  const initialized = runCli(initializationArgs(root));
  assert.equal(initialized.status, 0, initialized.stderr);

  const result = runCli(['project', 'document', '--root', root, '--stage', 'all']);

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /stage/i);
  assert.deepEqual(fs.readdirSync(root).sort(), ['.xppai-ax2012.json']);
});
