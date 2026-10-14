'use strict';

const { findProjectConfig, initializeProject } = require('../project/config');
const { ensureStageDocument } = require('../project/documents');

function requireValue(flags, name) {
  const value = flags[name];
  if (!value || value === true) throw new Error(`project requires ${name}`);
  return String(value);
}

function projectCommand(flags, positionals, context = {}) {
  const operation = positionals[0];
  let result;

  if (operation === 'init') {
    result = initializeProject({
      root: requireValue(flags, '--root'),
      createRoot: flags['--create-root'] === true,
      config: {
        companyTag: requireValue(flags, '--company-tag'),
        projectName: requireValue(flags, '--project-name'),
        developerName: requireValue(flags, '--developer'),
        objective: requireValue(flags, '--objective'),
      },
    });
    if (!context.quiet) process.stdout.write(`initialized AX 2012 project workspace at ${result.root}\n`);
    return result;
  }

  if (operation === 'document') {
    const workspace = findProjectConfig(requireValue(flags, '--root'));
    if (!workspace) throw new Error('project document requires an existing workspace configuration');
    result = ensureStageDocument({ root: workspace.root, config: workspace.config, stage: requireValue(flags, '--stage') });
    if (!context.quiet) process.stdout.write(`${result.created ? 'created' : 'preserved'} ${requireValue(flags, '--stage')}.md\n`);
    return result;
  }

  throw new Error('unknown project operation; expected init or document');
}

module.exports = projectCommand;
