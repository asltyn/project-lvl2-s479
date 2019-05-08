#!/usr/bin/env node
import * as commander from 'commander';
import genDiff from '..';

const command = new commander.Command();
command.description('Compares two configuration files and show a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
const [pathToFile1, pathToFile2] = command.args;
const diff = genDiff(pathToFile1, pathToFile2);
console.log(diff);
