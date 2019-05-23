const render = (ast) => {
  const formatKey = (key, path) => (path === '' ? key : `${path}.${key}`);
  const formatVal = val => (typeof val === 'object' ? '[complex value]' : val);
  const iter = (arr, path) => arr.reduce((acc, elem) => {
    if (elem.length === 3) {
      const [key, val1, val2] = elem;
      if (val1 === val2) {
        return acc;
      }
      const startSting = `Property '${formatKey(key, path)}' was`;
      if (val1 === undefined) return [...acc, `${startSting} added with value: ${formatVal(val2)}`];
      if (val2 === undefined) return [...acc, `${startSting} removed`];
      return [...acc, `${startSting} updated. From ${formatVal(val1)} to ${formatVal(val2)}`];
    }
    const [key, children] = elem;
    return [...acc, ...iter(children, formatKey(key, path))];
  }, []);

  return iter(ast, '').join('\n');
};

export default render;
