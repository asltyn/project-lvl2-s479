import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getFormatter from './formatters';


const propertyActions = [
  {
    type: 'inner',
    check: (key, obj1, obj2) => typeof obj1[key] === 'object' && typeof obj2[key] === 'object',
    process: (key, obj1, obj2, func) => func(obj1[key], obj2[key]),
  },
  {
    type: 'added',
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    process: (key, obj1, obj2) => obj2[key],
  },
  {
    type: 'deleted',
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    process: (key, obj1) => obj1[key],
  },
  {
    type: 'changed',
    check: (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (key, obj1, obj2) => ({ oldValue: obj1[key], newValue: obj2[key] }),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key],
    process: (key, obj1) => obj1[key],
  },
];

const getPropertyAction = args => propertyActions.find(({ check }) => check(...args));

const makeAst = (objBeforeChange, objAfterChange) => {
  const allKeys = _.union(Object.keys(objBeforeChange), Object.keys(objAfterChange));
  return allKeys.map((key) => {
    const args = [key, objBeforeChange, objAfterChange, makeAst];
    const { type, process } = getPropertyAction(args);
    return { type, name: key, value: process(...args) };
  });
};

const getAbsolutePath = p => (path.isAbsolute(p) ? p : path.resolve('./', p));

export default (path1, path2, format = 'def') => {
  const parse1 = getParser(path.extname(path1));
  const parse2 = getParser(path.extname(path2));
  const absPathToFile1 = getAbsolutePath(path1);
  const absPathToFile2 = getAbsolutePath(path2);
  const objBeforeChange = parse1(fs.readFileSync(absPathToFile1, 'UTF-8'));
  const objAfterChange = parse2(fs.readFileSync(absPathToFile2, 'UTF-8'));
  const ast = makeAst(objBeforeChange, objAfterChange);
  return getFormatter(format)(ast);
};
