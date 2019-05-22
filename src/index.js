import parseFile from './parsers';

const makeAst = (objBeforeChange, objAfterChange) => {
  const allKeys = [...new Set([...Object.keys(objBeforeChange), ...Object.keys(objAfterChange)])];
  return allKeys.sort().reduce((acc, key) => {
    const val1 = objBeforeChange[key];
    const val2 = objAfterChange[key];
    const arr = (typeof val1 === 'object' && typeof val2 === 'object') ? [makeAst(val1, val2)] : [val1, val2];
    return [...acc, [key, ...arr]];
  }, []);
};

const render = (ast) => {
  const stringify = (obj, tab) => Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object') {
      const firstLine = `${' '.repeat(tab * 4)}${key}: {`;
      const body = stringify(obj[key], tab + 1);
      const lastLine = `${' '.repeat(tab * 4 + 2)}}`;
      return [...acc, firstLine, body, lastLine];
    }
    return [...acc, `${' '.repeat(tab * 4)}${key}: ${obj[key]}`];
  }, []).join('\n');

  const iter = arr => arr.reduce((acc, elem) => {
    if (elem.length === 3) {
      const [key, val1, val2] = elem;
      if (val1 === val2) {
        acc[`  ${key}`] = val1;
        return acc;
      }
      if (val2 !== undefined) acc[`+ ${key}`] = val2;
      if (val1 !== undefined) acc[`- ${key}`] = val1;
      return acc;
    }
    const [key, children] = elem;
    acc[`  ${key}`] = iter(children);
    return acc;
  }, {});

  return stringify(iter(ast), 0);
};

export default (path1, path2) => {
  const objBeforeChange = parseFile(path1);
  const objAfterChange = parseFile(path2);
  const ast = makeAst(objBeforeChange, objAfterChange);
  return render(ast);
};
