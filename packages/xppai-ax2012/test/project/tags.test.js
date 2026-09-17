'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

const { classifyTaggedRange, formatLocalDate, renderTagPair } = require('../../src/project/tags');

const config = {
  schemaVersion: 1,
  companyTag: 'FGL',
  projectName: 'InvoiceSettlement',
  developerName: 't_robertaoliveira',
  objective: 'Record vendor invoice settlement changes',
};

test('renderTagPair renders same-level markers with a local calendar date', () => {
  assert.equal(formatLocalDate(new Date(2026, 0, 9)), '09/01/2026');
  assert.deepEqual(renderTagPair(config, new Date(2026, 8, 17)), {
    opening: '//<FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">',
    closing: '//</FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">',
  });
});

test('classifyTaggedRange recognizes existing workspace tags without changing their date', () => {
  const source = [
    '//<FGL workitem="InvoiceSettlement" date="16/09/2026" user="t_robertaoliveira">',
    'amount = 10;',
    '//</FGL workitem="InvoiceSettlement" date="16/09/2026" user="t_robertaoliveira">',
  ].join('\n');

  assert.equal(classifyTaggedRange(source, config), 'same-project');
  assert.match(source, /16\/09\/2026/);
});

test('classifyTaggedRange distinguishes a valid marker from another developer', () => {
  const source = [
    '//<FGL workitem="InvoiceSettlement" date="16/09/2026" user="otherDeveloper">',
    'amount = 10;',
    '//</FGL workitem="InvoiceSettlement" date="16/09/2026" user="otherDeveloper">',
  ].join('\n');

  assert.equal(classifyTaggedRange(source, config), 'other-project-or-developer');
});

test('classifyTaggedRange stops on mismatched or overlapping markers', () => {
  const mismatched = [
    '//<FGL workitem="InvoiceSettlement" date="16/09/2026" user="t_robertaoliveira">',
    'amount = 10;',
    '//</FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">',
  ].join('\n');
  const overlapping = [
    '//<FGL workitem="InvoiceSettlement" date="16/09/2026" user="t_robertaoliveira">',
    '//<FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">',
    '//</FGL workitem="InvoiceSettlement" date="17/09/2026" user="t_robertaoliveira">',
    '//</FGL workitem="InvoiceSettlement" date="16/09/2026" user="t_robertaoliveira">',
  ].join('\n');

  assert.equal(classifyTaggedRange(mismatched, config), 'ambiguous');
  assert.equal(classifyTaggedRange(overlapping, config), 'ambiguous');
});

test('classifyTaggedRange reports untagged source', () => {
  assert.equal(classifyTaggedRange('amount = 10;', config), 'untagged');
});
