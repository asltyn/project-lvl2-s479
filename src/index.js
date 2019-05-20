import lodash from 'lodash';
import parseFile from './parsers';

export default (path1, path2) => {
  const objBeforeChange = parseFile(path1);
  const objAfterChange = parseFile(path2);
  const allKeys = [...new Set([...Object.keys(objBeforeChange), ...Object.keys(objAfterChange)])];
  const makeString = (objBefore, objAfter, key) => {
    if (objBefore[key] === objAfter[key]) return [`  ${key}: ${objBefore[key]}`];
    const strBefore = lodash.has(objBefore, key) ? [`- ${key}: ${objBefore[key]}`] : [];
    const strAfter = lodash.has(objAfter, key) ? [`+ ${key}: ${objAfter[key]}`] : [];
    return [...strAfter, ...strBefore];
  };
  return allKeys.sort().reduce((acc, x) => [...acc, ...makeString(objBeforeChange, objAfterChange, x)], []).join('\n');
};
