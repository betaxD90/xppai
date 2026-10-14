'use strict';
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const PACKAGE_ROOT = path.resolve(__dirname, '../..');
function runCli(args, options = {}) {
 return spawnSync(process.execPath, [path.join(PACKAGE_ROOT, 'bin/xppai-365.js'), ...args], { cwd:options.cwd || PACKAGE_ROOT, encoding:'utf8', env:options.env || process.env });
}
module.exports = { runCli, PACKAGE_ROOT };
