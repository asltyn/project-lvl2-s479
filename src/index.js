import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getFormatter from './formatters';

const getNodeType = (key, val1, val2) => {
  const type1 = typeof val1;
  const type2 = typeof val2;
  if (type1 === 'object' && type2 === 'object') return 'inner';
  if (type1 === 'undefined') return 'added';
  if (type2 === 'undefined') return 'deleted';
  if (val1 === val2) return 'unchanged';
  return 'changed';
};

const makeAst = (objBeforeChange, objAfterChange) => {
  const allKeys = _.union(Object.keys(objBeforeChange), Object.keys(objAfterChange));
  return allKeys.map((key) => {
    const oldValue = objBeforeChange[key];
    const newValue = objAfterChange[key];
    const type = getNodeType(key, oldValue, newValue);
    const node = { name: key, type };
    return (type === 'inner') ? { ...node, children: makeAst(oldValue, newValue) } : { ...node, oldValue, newValue };
  });
};

const getAbsolutePath = p => (path.isAbsolute(p) ? p : path.resolve('./', p));

export default (path1, path2, format) => {
  const parser1 = getParser(path.extname(path1));
  const parser2 = getParser(path.extname(path2));
  const absPathToFile1 = getAbsolutePath(path1);
  const absPathToFile2 = getAbsolutePath(path2);
  const objBeforeChange = parser1(fs.readFileSync(absPathToFile1, 'UTF-8'));
  const objAfterChange = parser2(fs.readFileSync(absPathToFile2, 'UTF-8'));
  const ast = makeAst(objBeforeChange, objAfterChange);
  return getFormatter(format)(ast);
};
