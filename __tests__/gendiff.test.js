import fs from 'fs';
import genDiff from '../src';

test('diff', () => {
  expect(genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json')).toBe(fs.readFileSync(__dirname + '/__fixtures__/result', 'UTF-8').slice(0,-1));
});
