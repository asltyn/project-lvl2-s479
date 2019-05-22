import parseFile from './parsers';
import getFormatter from './formatters';

const makeAst = (objBeforeChange, objAfterChange) => {
  const allKeys = [...new Set([...Object.keys(objBeforeChange), ...Object.keys(objAfterChange)])];
  return allKeys.sort().reduce((acc, key) => {
    const val1 = objBeforeChange[key];
    const val2 = objAfterChange[key];
    const arr = (typeof val1 === 'object' && typeof val2 === 'object') ? [makeAst(val1, val2)] : [val1, val2];
    return [...acc, [key, ...arr]];
  }, []);
};


export default (path1, path2, format) => {
  const objBeforeChange = parseFile(path1);
  const objAfterChange = parseFile(path2);
  const ast = makeAst(objBeforeChange, objAfterChange);
  const objToOutput = getFormatter(format)(ast);
  return objToOutput;
};
