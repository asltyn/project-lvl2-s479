import _ from 'lodash';

const stringify = val => (typeof val === 'object' ? '[complex value]' : val);
const formatName = (name, parentName) => (parentName === '' ? name : `${parentName}.${name}`);

const propertyAction = {
  added: (begin, val) => `${begin} added with value: ${stringify(val)}`,
  deleted: begin => `${begin} removed`,
  changed: (begin, val) => `${begin} updated. From ${stringify(val.oldValue)} to ${stringify(val.newValue)}`,
  unchanged: () => null,
  inner: (begin, val, name, parentName, func) => func(val, formatName(name, parentName)),
};

const render = (ast) => {
  const iter = (tree, parentName) => tree.map((node) => {
    const { type, name, value } = node;
    const beginingOfLine = `Property '${formatName(name, parentName)}' was`;
    return propertyAction[type](beginingOfLine, value, name, parentName, iter);
  });
  return _.flattenDeep(iter(ast, '')).filter(_.identity).join('\n');
};

export default render;
