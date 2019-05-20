import fs from 'fs';
import genDiff from '../src';

test.each([['./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json'], ['./__tests__/__fixtures__/before.yaml', './__tests__/__fixtures__/after.yaml'], ['./__tests__/__fixtures__/before.ini', './__tests__/__fixtures__/after.ini']])('diff', (a,b) => {
   expect(genDiff(a,b)).toBe(fs.readFileSync(__dirname + '/__fixtures__/result', 'UTF-8').slice(0,-1));
});

