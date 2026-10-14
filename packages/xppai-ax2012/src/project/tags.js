'use strict';

const TAG_LINE = /^\s*\/\/<(\/)?([^\s>]+) workitem="([^"]+)" date="(\d{2}\/\d{2}\/\d{4})" user="([^"]+)">\s*$/;

function formatLocalDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

function renderTagPair(config, date = new Date()) {
  const attributes = `workitem="${config.projectName}" date="${formatLocalDate(date)}" user="${config.developerName}"`;
  return {
    opening: `//<${config.companyTag} ${attributes}>`,
    closing: `//</${config.companyTag} ${attributes}>`,
  };
}

function classifyTaggedRange(source, config) {
  const stack = [];
  const pairs = [];
  const lines = String(source).split(/\r?\n/);

  for (const line of lines) {
    if (!line.includes('//<')) continue;
    const match = TAG_LINE.exec(line);
    if (!match) return 'ambiguous';

    const tag = {
      companyTag: match[2],
      workitem: match[3],
      date: match[4],
      developerName: match[5],
    };
    if (!match[1]) {
      if (stack.length > 0) return 'ambiguous';
      stack.push(tag);
    } else {
      const opening = stack.pop();
      if (!opening || !sameAttributes(opening, tag)) return 'ambiguous';
      pairs.push(tag);
    }
  }

  if (stack.length > 0) return 'ambiguous';
  if (pairs.length === 0) return 'untagged';
  return pairs.every((tag) => tag.companyTag === config.companyTag
    && tag.workitem === config.projectName
    && tag.developerName === config.developerName)
    ? 'same-project'
    : 'other-project-or-developer';
}

function sameAttributes(left, right) {
  return left.companyTag === right.companyTag
    && left.workitem === right.workitem
    && left.date === right.date
    && left.developerName === right.developerName;
}

module.exports = { classifyTaggedRange, formatLocalDate, renderTagPair };
