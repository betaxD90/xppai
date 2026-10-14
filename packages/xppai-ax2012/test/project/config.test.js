'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { afterEach, test } = require('node:test');

const {
  CONFIG_FILE_NAME,
  findProjectConfig,
  initializeProject,
  validateProjectConfig,
} = require('../../src/project/config');

const temporaryRoots = [];

function createTemporaryRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xppai-ax2012-project-'));
  temporaryRoots.push(root);
  return root;
}

function validConfig() {
  return {
    companyTag: 'FGL',
    projectName: 'InvoiceSettlement',
    developerName: 't_robertaoliveira',
    objective: 'Record vendor invoice settlement changes',
  };
}

afterEach(() => {
  while (temporaryRoots.length > 0) fs.rmSync(temporaryRoots.pop(), { recursive: true, force: true });
});

test('initializeProject creates only the requested root and minimal configuration', () => {
  const parent = createTemporaryRoot();
  const root = path.join(parent, 'InvoiceSettlement');

  const result = initializeProject({ root, createRoot: true, config: validConfig() });

  assert.equal(result.root, root);
  assert.equal(result.configPath, path.join(root, CONFIG_FILE_NAME));
  assert.deepEqual(result.config, { schemaVersion: 1, ...validConfig() });
  assert.deepEqual(fs.readdirSync(root), [CONFIG_FILE_NAME]);
  assert.deepEqual(JSON.parse(fs.readFileSync(result.configPath, 'utf8')), { schemaVersion: 1, ...validConfig() });
});

test('initializeProject rejects an existing configuration without overwriting it', () => {
  const root = createTemporaryRoot();
  const first = initializeProject({ root, createRoot: false, config: validConfig() });
  const original = fs.readFileSync(first.configPath, 'utf8');

  assert.throws(
    () => initializeProject({ root, createRoot: false, config: { ...validConfig(), objective: 'A different objective' } }),
    /already exists/i,
  );
  assert.equal(fs.readFileSync(first.configPath, 'utf8'), original);
});

test('validateProjectConfig rejects blank project metadata', () => {
  for (const key of ['companyTag', 'projectName', 'developerName', 'objective']) {
    assert.throws(() => validateProjectConfig({ ...validConfig(), [key]: '   ' }), new RegExp(key));
  }
});

test('validateProjectConfig rejects values that would break a documentation marker', () => {
  assert.throws(() => validateProjectConfig({ ...validConfig(), companyTag: 'FGL Team' }), /companyTag/i);
  assert.throws(() => validateProjectConfig({ ...validConfig(), projectName: 'Invoice"Settlement' }), /projectName/i);
  assert.throws(() => validateProjectConfig({ ...validConfig(), developerName: 'roberta\noliveira' }), /developerName/i);
});

test('initializeProject rejects a file root without creating configuration', () => {
  const parent = createTemporaryRoot();
  const root = path.join(parent, 'not-a-directory');
  fs.writeFileSync(root, 'existing file', 'utf8');

  assert.throws(() => initializeProject({ root, createRoot: true, config: validConfig() }), /directory/i);
  assert.equal(fs.existsSync(path.join(root, CONFIG_FILE_NAME)), false);
});

test('findProjectConfig locates the nearest workspace configuration', () => {
  const root = createTemporaryRoot();
  const nested = path.join(root, 'src', 'classes');
  fs.mkdirSync(nested, { recursive: true });
  const initialized = initializeProject({ root, createRoot: false, config: validConfig() });

  assert.deepEqual(findProjectConfig(nested), initialized);
});

test('findProjectConfig returns null when no parent is a workspace', () => {
  const root = createTemporaryRoot();
  const nested = path.join(root, 'src');
  fs.mkdirSync(nested);

  assert.equal(findProjectConfig(nested), null);
});

test('findProjectConfig rejects nested workspace roots instead of silently selecting one', () => {
  const root = createTemporaryRoot();
  const child = path.join(root, 'child-workspace');
  const nested = path.join(child, 'src');
  fs.mkdirSync(nested, { recursive: true });
  initializeProject({ root, createRoot: false, config: validConfig() });
  initializeProject({ root: child, createRoot: false, config: { ...validConfig(), projectName: 'ChildProject' } });

  assert.throws(() => findProjectConfig(nested), /multiple project workspace configurations/i);
});
