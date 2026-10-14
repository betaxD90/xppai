'use strict';
const TOP_LEVEL_COMMANDS = Object.freeze(['list', 'path', 'install', 'export']);
function parseArgs(argv) {
  const flags = {}, positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i] === '-h' ? '--help' : argv[i] === '-v' ? '--version' : argv[i];
    if (['--help','--version'].includes(arg)) flags[arg] = true;
    else if (['--target','--mode','--out'].includes(arg)) {
      if (!argv[i+1] || argv[i+1].startsWith('-')) throw new Error(arg + ' requires a value');
      flags[arg] = argv[++i];
    } else if (arg.startsWith('-')) throw new Error('unknown option: ' + arg);
    else positionals.push(arg);
  }
  if (positionals.length > 1) throw new Error('unexpected positional argument: ' + positionals[1]);
  return { command: positionals[0] || null, positionals, flags };
}
function printHelp() {
  process.stdout.write('xppai-365 - D365FO skill suite\nusage: xppai-365 <command> [options]\ncommands: ' + TOP_LEVEL_COMMANDS.join(', ') + '\ninstall --target <claude|codex|qwen|copilot|all> [--mode copy|symlink]\nexport --target <claude|codex|qwen|copilot|generic> --out <directory> [--mode copy|symlink]\n');
}
async function run(argv = process.argv) {
  const {command, flags} = parseArgs(argv.slice(2));
  if (flags['--help']) return printHelp();
  if (flags['--version']) { process.stdout.write(require('../package.json').version + '\n'); return; }
  if (!command) { printHelp(); process.exitCode = 1; return; }
  if (!TOP_LEVEL_COMMANDS.includes(command)) throw new Error('unknown command: ' + command);
  const allowed = command === 'install' ? ['--target','--mode'] : command === 'export' ? ['--target','--mode','--out'] : [];
  for (const flag of Object.keys(flags)) if (!allowed.includes(flag)) throw new Error('unexpected option for ' + command + ': ' + flag);
  await require('./commands/' + command)(flags, []);
}
module.exports = { parseArgs, printHelp, run };
