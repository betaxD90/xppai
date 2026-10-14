'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
function snapshotTree(root) {
 const result = {};
 function walk(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir).sort()) {
   const file = path.join(dir, name), relative = prefix + name, stat = fs.lstatSync(file);
   if (stat.isSymbolicLink()) result[relative] = {link:fs.readlinkSync(file)};
   else if (stat.isDirectory()) { result[relative+'/'] = 'directory'; walk(file, relative+'/'); }
   else result[relative] = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  }
 }
 walk(root,'');
 return result;
}
module.exports = { snapshotTree };
