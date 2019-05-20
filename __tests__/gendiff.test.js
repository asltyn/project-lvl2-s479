import fs from 'fs';
import genDiff from '../src';

test('diff_json', () => {
  expect(genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json')).toBe(fs.readFileSync(__dirname + '/__fixtures__/result', 'UTF-8').slice(0,-1));
});

test('diff_yaml', () => {
  expect(genDiff('./__tests__/__fixtures__/before.yaml', './__tests__/__fixtures__/after.yaml')).toBe(fs.readFileSync(__dirname + '/__fixtures__/result', 'UTF-8').slice(0,-1));
});
