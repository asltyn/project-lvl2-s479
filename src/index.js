import fs from 'fs';
import path from 'path';
import lodash from 'lodash';

export default (path1, path2) => {
  const getAbsolutePath = p => (path.isAbsolute(p) ? p : path.resolve('./', p));
  const getObjectFromFile = pathFile => JSON.parse(fs.readFileSync(getAbsolutePath(pathFile), 'UTF-8'));
  const objBeforeChange = getObjectFromFile(path1);
  const objAfterChange = getObjectFromFile(path2);
  const allKeys = [...new Set([...Object.keys(objBeforeChange), ...Object.keys(objAfterChange)])];
  const makeString = (objBefore, objAfter, key) => {
    if (objBefore[key] === objAfter[key]) return [`  ${key}: ${objBefore[key]}`];
    const strBefore = lodash.has(objBefore, key) ? [`- ${key}: ${objBefore[key]}`] : [];
    const strAfter = lodash.has(objAfter, key) ? [`+ ${key}: ${objAfter[key]}`] : [];
    return [...strAfter, ...strBefore];
  };
  return allKeys.sort().reduce((acc, x) => [...acc, ...makeString(objBeforeChange, objAfterChange, x)], []).join('\n');
};
