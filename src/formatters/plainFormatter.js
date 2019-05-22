const render = (ast) => {
  const iter = (arr, path) => {
    const formatKey = key => (path === '' ? key : `${path}.${key}`);
    const formatVal = val => (typeof val === 'object' ? '[complex value]' : val);
    return arr.reduce((acc, elem) => {
      if (elem.length === 3) {
        const [key, val1, val2] = elem;
        if (val1 === val2) {
          return acc;
        }
        const startSting = `Property '${formatKey(key)}' was`;
        if (val1 === undefined) return [...acc, `${startSting} added with value: ${formatVal(val2)}`];
        if (val2 === undefined) return [...acc, `${startSting} removed`];
        return [...acc, `${startSting} updated. From ${formatVal(val1)} to ${formatVal(val2)}`];
      }
      const [key, children] = elem;
      return [...acc, ...iter(children, formatKey(key))];
    }, []);
  };
  return iter(ast, '').join('\n');
};

export default render;
