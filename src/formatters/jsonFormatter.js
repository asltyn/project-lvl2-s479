const iter = arr => arr.reduce((acc, node) => {
  const key = node.name;
  switch (node.type) {
    case 'added':
      acc[`+ ${key}`] = node.newValue;
      break;
    case 'deleted':
      acc[`- ${key}`] = node.oldValue;
      break;
    case 'changed':
      acc[`+ ${key}`] = node.newValue;
      acc[`- ${key}`] = node.oldValue;
      break;
    case 'unchanged':
      acc[`  ${key}`] = node.oldValue;
      break;
    case 'inner':
      acc[`  ${key}`] = iter(node.children);
      break;
    default: break;
  }
  return acc;
}, {});

export default ast => JSON.stringify(iter(ast), null, '  ');
