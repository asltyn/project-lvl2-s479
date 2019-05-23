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

export default ast => JSON.stringify(iter(ast), null, '  ');
