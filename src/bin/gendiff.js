#!/usr/bin/env node
import * as commander from 'commander';
import genDiff from '..';

const program = new commander.Command();
program.description('Compares two configuration files and show a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format', 'def')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);

if (program.args.length < 2) program.help();
const [pathToFile1, pathToFile2] = program.args;
const diff = genDiff(pathToFile1, pathToFile2, program.format);
console.log(diff);
