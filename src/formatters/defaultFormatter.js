import _ from 'lodash';

const stringify = (val, level) => {
  const depthOfOneLevel = 4;
  const indent = ' '.repeat(level * depthOfOneLevel);
  if (typeof val !== 'object') return val;
  const res = Object.entries(val).map(([key, v]) => `${indent}${key}: ${stringify(v, level + 1)}`).join('\n');
  return `{\n${res}\n${indent}}`;
};

const propertyAction = {
  added: (name, val, indent, fToStr) => `${indent}+ ${name}: ${fToStr(val)}`,
  deleted: (name, val, indent, fToStr) => `${indent}- ${name}: ${fToStr(val)}`,
  changed: (name, val, indent, fToStr) => [`${indent}- ${name}: ${fToStr(val.oldValue)}`,
   `${indent}+ ${name}: ${fToStr(val.newValue)}`],
  unchanged: (name, val, indent, fToStr) => `${indent}  ${name}: ${fToStr(val)}`,
  inner: (name, val, indent, fToStr, fIter) => [`${indent}  ${name}: {`, fIter(val), `${indent}  }`],
};

const render = (ast) => {
  const depthOfOneLevel = 4;
  const iter = (tree, currLevel) => tree.map((node) => {
    const indent = ' '.repeat(currLevel * depthOfOneLevel);
    const { type, name, value } = node;
    return propertyAction[type](name, value, indent, val => stringify(val, currLevel + 1), val => iter(val, currLevel + 1));
  });
  return _.flattenDeep(iter(ast, 0)).join('\n');
};

export default render;
