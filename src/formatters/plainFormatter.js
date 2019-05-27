import _ from 'lodash';

const stringify = val => (typeof val === 'object' ? '[complex value]' : val);
const formatName = (name, parent) => (parent === '' ? name : `${parent}.${name}`);

const render = (ast) => {
  const iter = (acc, parentKey) => acc.map((node) => {
    const {type, key, value} = node;
    const startLine = `Property '${formatName(key, parentKey)}' was`;
    switch (type) {
      case 'added': 
        return `${startLine} added with value: ${stringify(value)}`;
      case 'deleted': 
        return `${startLine} removed`;
      case 'changed': 
        return `${startLine} updated. From ${stringify(value.oldValue)} to ${stringify(value.newValue)}`;
      case 'inner': 
        return iter(value, formatName(key, parentKey));
      default: 
        return null;
    }
  });
  return _.flattenDeep(iter(ast, '')).filter(x => x).join('\n');
};

export default render;
