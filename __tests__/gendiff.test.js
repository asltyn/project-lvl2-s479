import fs from 'fs';
import genDiff from '../src';

const pathToJson1 = './__tests__/__fixtures__/before.json';
const pathToJson2 = './__tests__/__fixtures__/after.json';
const pathToYaml1 = './__tests__/__fixtures__/before.yaml';
const pathToYaml2 = './__tests__/__fixtures__/after.yaml';
const pathToIni1 = './__tests__/__fixtures__/before.ini';
const pathToIni2 = './__tests__/__fixtures__/after.ini';

const pathToDefaultResult = '/__fixtures__/result-default';
const pathToPlainResult = '/__fixtures__/result-plain';
const pathToJsonResult = '/__fixtures__/result.json';

test.each([
  ['def', pathToJson1, pathToJson2, pathToDefaultResult],
  ['def', pathToYaml1, pathToYaml2, pathToDefaultResult],
  ['def', pathToIni1, pathToIni2, pathToDefaultResult],
  ['plain', pathToJson1, pathToJson2, pathToPlainResult],
  ['plain', pathToYaml1, pathToYaml2, pathToPlainResult],
  ['plain', pathToIni1, pathToIni2, pathToPlainResult],
  ['json', pathToJson1, pathToJson2, pathToJsonResult],
  ['json', pathToYaml1, pathToYaml2, pathToJsonResult],
  ['json', pathToIni1, pathToIni2, pathToJsonResult],
])(
  '%s',
  (format, first, second, result) => {
    expect(genDiff(first, second, format)).toBe(fs.readFileSync(`${__dirname}${result}`, 'UTF-8').trimRight());
  },
);
