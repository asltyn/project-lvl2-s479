import _ from 'lodash';

const stringify = val => (typeof val === 'object' ? '[complex value]' : val);
const formatName = (name, parent) => (parent === '' ? name : `${parent}.${name}`);

const render = (ast) => {
  const iter = (acc, parentName) => acc.map((node) => {
    const key = `Property '${formatName(node.name, parentName)}' was`;
    switch (node.type) {
      case 'added': return `${key} added with value: ${stringify(node.newValue)}`;
      case 'deleted': return `${key} removed`;
      case 'changed': return `${key} updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'inner': return iter(node.children, formatName(node.name, parentName));
      default: return null;
    }
  });
  return _.flattenDeep(iter(ast, '')).filter(x => x).join('\n');
};

export default render;
