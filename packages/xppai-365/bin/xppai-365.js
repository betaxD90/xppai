#!/usr/bin/env node
'use strict';
require('../src/cli').run(process.argv).catch(error => {
  process.stderr.write('xppai-365: ' + error.message + '\n');
  process.exitCode = 1;
});
