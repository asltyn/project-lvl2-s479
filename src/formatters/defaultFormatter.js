import _ from 'lodash';

const stringify = (val, i) => {
  const indent = 2;
  if (typeof val !== 'object') return val;
  const res = Object.entries(val).map(([key, v]) => `${' '.repeat(i)}${key}: ${stringify(v, i + indent)}`).join('\n');
  return `{\n${res}\n${' '.repeat(i - indent)}}`;
};

const render = (ast) => {
  const indent = 4;
  const iter = (acc, levelDepth) => acc.map((node) => {
    const depth = ' '.repeat(treeDepth);
    switch (node.type) {
      case 'added': return `${depth}+ ${node.name}: ${stringify(node.newValue, i + indent)}`;
      case 'deleted': return `${depth}- ${node.name}: ${stringify(node.oldValue, i + indent)}`;
      case 'unchanged': return `${depth}  ${node.name}: ${stringify(node.oldValue, i + indent)}`;
      case 'changed': return [`${depth}- ${node.name}: ${stringify(node.oldValue, i + indent)}`,
        `${depth}+ ${node.name}: ${stringify(node.newValue, i + indent)}`];
      case 'inner': return [`${depth}  ${node.name}: {`, iter(node.children, i + indent), `${' '.repeat(i + 2)}}`];
      default: return null;
    }
  });
  return _.flattenDeep(iter(ast, 0)).join('\n');
};

export default render;
