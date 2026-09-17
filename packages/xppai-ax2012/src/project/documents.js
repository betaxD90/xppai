'use strict';

const fs = require('node:fs');
const path = require('node:path');

const STAGE_FILES = Object.freeze({
  'action-plan': 'action-plan.md',
  'code-review': 'code-review.md',
  'technical-changes': 'technical-changes.md',
  'functional-summary': 'functional-summary.md',
  'test-plan': 'test-plan.md',
});

function renderDocument(stage, config) {
  const templates = {
    'action-plan': [
      '# Action Plan',
      '',
      `## Objective\n\n${config.objective}`,
      '',
      '## Direct Steps\n\n- ',
      '',
      '## Risks and Assumptions\n\n- ',
    ],
    'code-review': [
      '# Code Review',
      '',
      `## Scope\n\n${config.projectName}`,
      '',
      '## Findings\n\n- ',
      '',
      '## Disposition\n\n- ',
    ],
    'technical-changes': [
      '# Technical Changes',
      '',
      `## Objective\n\n${config.objective}`,
      '',
      '## Components Changed\n\n- ',
      '',
      '## Implementation Notes\n\n- ',
      '',
      '## Operational Considerations\n\n- ',
    ],
    'functional-summary': [
      '# Functional Summary',
      '',
      `## Business Behavior\n\n${config.objective}`,
      '',
      '## Impact\n\n- ',
      '',
      '## Expected Result\n\n- ',
    ],
    'test-plan': [
      '# Test Plan',
      '',
      `## Objective\n\n${config.objective}`,
      '',
      '## Suggested Scenarios\n\n- ',
      '',
      '## Expected Outcomes\n\n- ',
      '',
      '## Environment-Dependent Checks\n\n- ',
    ],
  };
  return `${templates[stage].join('\n')}\n`;
}

function ensureStageDocument({ root, config, stage }) {
  const filename = STAGE_FILES[stage];
  if (!filename) throw new Error('project document requires a supported stage');
  const target = path.join(root, filename);
  if (fs.existsSync(target)) return { path: target, created: false };
  fs.writeFileSync(target, renderDocument(stage, config), 'utf8');
  return { path: target, created: true };
}

module.exports = { STAGE_FILES, ensureStageDocument, renderDocument };
