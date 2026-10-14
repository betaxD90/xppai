'use strict';
const path = require('node:path');
const { validateSkillContracts } = require('./skills/contracts');
const root = () => path.resolve(__dirname, '../assets');
module.exports = {
  root,
  path: () => path.join(root(), 'skills'),
  commandsPath: () => path.join(root(), 'commands'),
  list: () => validateSkillContracts(path.resolve(__dirname, '..')),
};
