#!/usr/bin/env node
import * as commander from 'commander';

const command = new commander.Command();
command.description('Compares two configuration files and show a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
