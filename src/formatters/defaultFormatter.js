const stringify = (obj, i) => Object.keys(obj).reduce((acc, key) => {
  const indent = ' '.repeat((i + 1) * 4);
  if (typeof obj[key] === 'object') {
    const firstLine = `${indent}${key}: {`;
    const body = stringify(obj[key], i);
    const lastLine = `${indent}  }`;
    return [...acc, firstLine, body, lastLine];
  }
  return [...acc, `${indent}${key}: ${obj[key]}`];
}, []).join('\n');

const render = (ast) => {
  const iter = (arr, i) => {
    const indent = ' '.repeat(i * 4);
    const formatVal = val => (typeof val === 'object' ? ['{', stringify(val, i), `${indent}  }`].join('\n') : val);
    return arr.reduce((acc, elem) => {
      if (elem.length === 3) {
        const [key, val1, val2] = elem;
        if (val1 === val2) return [...acc, `${' '.repeat(i * 4)}  ${key}: ${val1}`];
        if (val1 === undefined) return [...acc, `${indent}+ ${key}: ${formatVal(val2)}`];
        if (val2 === undefined) return [...acc, `${indent}- ${key}: ${formatVal(val1)}`];
        return [...acc, `${indent}+ ${key}: ${formatVal(val2)}`, `${indent}- ${key}: ${formatVal(val1)}`];
      }
      const [key, children] = elem;
      return [...acc, `${indent}  ${key}: {`, `${iter(children, i + 1).join('\n')}`, `${indent}  }`];
    }, []);
  };
  return iter(ast, 0).join('\n');
};

export default render;
