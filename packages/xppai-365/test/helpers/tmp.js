'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
function useTempDir(t, prefix = 'xppai-365-test-') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
module.exports = { useTempDir };

