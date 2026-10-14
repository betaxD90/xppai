'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { PUBLIC_SKILLS } = require('../constants');
function validateSkillContracts(root) {
  const assetRoot = path.basename(path.resolve(root)) === 'assets' ? path.resolve(root) : path.join(root, 'assets');
  const skillsRoot = path.join(assetRoot, 'skills');
  const names = fs.readdirSync(skillsRoot, {withFileTypes:true}).filter(e => e.isDirectory()).map(e => e.name).sort();
  if (JSON.stringify(names) !== JSON.stringify([...PUBLIC_SKILLS].sort())) throw new Error('D365FO skill catalog mismatch');
  for (const name of names) {
    const text = fs.readFileSync(path.join(skillsRoot, name, 'SKILL.md'), 'utf8');
    const header = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!header || !header[1].split(/\r?\n/).includes('name: ' + name)) throw new Error('invalid skill frontmatter: ' + name);
    if (!/D365FO/.test(text)) throw new Error('missing D365FO baseline: ' + name);
    if (fs.existsSync(path.join(skillsRoot, name, 'references'))) throw new Error('private reference tree: ' + name);
  }
  if (!fs.existsSync(path.join(skillsRoot, 'xppai-365-papai/AGENT.md'))) throw new Error('missing Papai AGENT.md');
  return names;
}
module.exports = { validateSkillContracts };
