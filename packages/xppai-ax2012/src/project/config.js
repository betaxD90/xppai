'use strict';

const fs = require('node:fs');
const path = require('node:path');

const CONFIG_FILE_NAME = '.xppai-ax2012.json';
const CONFIG_SCHEMA_VERSION = 1;
const CONFIG_KEYS = Object.freeze(['companyTag', 'projectName', 'developerName', 'objective']);

function validateProjectConfig(value) {
  for (const key of CONFIG_KEYS) {
    if (typeof value?.[key] !== 'string' || value[key].trim() === '') {
      throw new Error(`project configuration requires non-empty ${key}`);
    }
  }

  return Object.freeze({
    schemaVersion: CONFIG_SCHEMA_VERSION,
    companyTag: value.companyTag.trim(),
    projectName: value.projectName.trim(),
    developerName: value.developerName.trim(),
    objective: value.objective.trim(),
  });
}

function configPathFor(root) {
  return path.join(root, CONFIG_FILE_NAME);
}

function readProjectConfig(root) {
  const configPath = configPathFor(root);
  const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  if (parsed.schemaVersion !== CONFIG_SCHEMA_VERSION) {
    throw new Error(`unsupported project configuration schemaVersion ${parsed.schemaVersion}`);
  }
  return validateProjectConfig(parsed);
}

function initializeProject({ root, config, createRoot }) {
  const resolvedRoot = path.resolve(String(root));
  if (fs.existsSync(resolvedRoot)) {
    if (!fs.statSync(resolvedRoot).isDirectory()) throw new Error('project root must be a directory');
  } else if (createRoot) {
    fs.mkdirSync(resolvedRoot, { recursive: true });
  } else {
    throw new Error('project root does not exist; use createRoot to create it');
  }

  const configPath = configPathFor(resolvedRoot);
  if (fs.existsSync(configPath)) throw new Error(`project configuration already exists at ${configPath}`);

  const validated = validateProjectConfig(config);
  fs.writeFileSync(configPath, `${JSON.stringify(validated, null, 2)}\n`, 'utf8');
  return { root: resolvedRoot, configPath, config: validated };
}

function findProjectConfig(startPath) {
  let cursor = path.resolve(String(startPath));
  if (fs.existsSync(cursor) && !fs.statSync(cursor).isDirectory()) cursor = path.dirname(cursor);

  while (true) {
    const configPath = configPathFor(cursor);
    if (fs.existsSync(configPath)) return { root: cursor, configPath, config: readProjectConfig(cursor) };
    const parent = path.dirname(cursor);
    if (parent === cursor) return null;
    cursor = parent;
  }
}

module.exports = {
  CONFIG_FILE_NAME,
  CONFIG_SCHEMA_VERSION,
  configPathFor,
  findProjectConfig,
  initializeProject,
  readProjectConfig,
  validateProjectConfig,
};
