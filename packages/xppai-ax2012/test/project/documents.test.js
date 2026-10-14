'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { afterEach, test } = require('node:test');

const { ensureStageDocument } = require('../../src/project/documents');

const temporaryRoots = [];
const config = {
  schemaVersion: 1,
  companyTag: 'FGL',
  projectName: 'InvoiceSettlement',
  developerName: 't_robertaoliveira',
  objective: 'Record vendor invoice settlement changes',
};

function createTemporaryRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'xppai-ax2012-documents-'));
  temporaryRoots.push(root);
  return root;
}

afterEach(() => {
  while (temporaryRoots.length > 0) fs.rmSync(temporaryRoots.pop(), { recursive: true, force: true });
});

test('ensureStageDocument creates only the requested action plan', () => {
  const root = createTemporaryRoot();

  const result = ensureStageDocument({ root, config, stage: 'action-plan' });

  assert.equal(path.basename(result.path), 'action-plan.md');
  assert.equal(result.created, true);
  assert.equal(fs.existsSync(path.join(root, 'code-review.md')), false);
  assert.match(fs.readFileSync(result.path, 'utf8'), /# Action Plan/);
  assert.match(fs.readFileSync(result.path, 'utf8'), /## Direct Steps/);
  assert.match(fs.readFileSync(result.path, 'utf8'), /## Risks and Assumptions/);
});

test('ensureStageDocument preserves an existing document', () => {
  const root = createTemporaryRoot();
  const first = ensureStageDocument({ root, config, stage: 'code-review' });
  fs.appendFileSync(first.path, '\nPreserved reviewer note.\n', 'utf8');

  const second = ensureStageDocument({ root, config, stage: 'code-review' });

  assert.equal(second.created, false);
  assert.match(fs.readFileSync(second.path, 'utf8'), /Preserved reviewer note/);
});

test('ensureStageDocument rejects an unsupported stage without writing files', () => {
  const root = createTemporaryRoot();

  assert.throws(() => ensureStageDocument({ root, config, stage: 'all' }), /stage/i);
  assert.deepEqual(fs.readdirSync(root), []);
});

test('each supported stage has short required headings', () => {
  const root = createTemporaryRoot();
  const requiredHeadings = {
    'code-review': ['# Code Review', '## Findings', '## Disposition'],
    'technical-changes': ['# Technical Changes', '## Components Changed', '## Operational Considerations'],
    'functional-summary': ['# Functional Summary', '## Business Behavior', '## Impact'],
    'test-plan': ['# Test Plan', '## Suggested Scenarios', '## Expected Outcomes'],
  };

  for (const [stage, headings] of Object.entries(requiredHeadings)) {
    const { path: documentPath } = ensureStageDocument({ root, config, stage });
    const content = fs.readFileSync(documentPath, 'utf8');
    for (const heading of headings) assert.match(content, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
