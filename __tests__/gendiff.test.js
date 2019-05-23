import fs from 'fs';
import genDiff from '../src';

test.each([['./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json'], 
           ['./__tests__/__fixtures__/before.yaml', './__tests__/__fixtures__/after.yaml'], 
           ['./__tests__/__fixtures__/before.ini', './__tests__/__fixtures__/after.ini']])
('diff', (a,b) => {
   expect(genDiff(a,b,'def')).toBe(fs.readFileSync(__dirname + '/__fixtures__/result-default', 'UTF-8').slice(0,-1));
   expect(genDiff(a,b,'plain')).toBe(fs.readFileSync(__dirname + '/__fixtures__/result-plain', 'UTF-8').slice(0,-1));
   expect(genDiff(a,b,'json')).toBe(fs.readFileSync(__dirname + '/__fixtures__/result.json', 'UTF-8').slice(0,-1));
});

