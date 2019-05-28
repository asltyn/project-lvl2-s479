import _ from 'lodash';

const stringify = (value, initialIndent) => {
  const extraSpacesOnLevel = 2;
  const iter = (val, innerLevel) => {
    if (typeof val !== 'object') return val;
    const indent = `${initialIndent}${' '.repeat(innerLevel * extraSpacesOnLevel)}`;
    const res = Object.entries(val).map(([key, v]) => `${indent}${key}: ${iter(v, innerLevel + 1)}`).join('\n');
    return `{\n${res}\n${indent.slice(0, -extraSpacesOnLevel)}}`;
  };
  return iter(value, 0);
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
  const extraSpacesOnLevel = 4;
  const iter = (tree, currLevel) => tree.map((node) => {
    const { type, name, value } = node;
    const indent = ' '.repeat(currLevel * extraSpacesOnLevel);
    const indentForNextLevel = ' '.repeat((currLevel + 1) * extraSpacesOnLevel);
    const process = propertyAction[type];
    return process(name, value, indent, v => stringify(v, indentForNextLevel), v => iter(v, currLevel + 1));
  });
  return _.flattenDeep(iter(ast, 0)).join('\n');
};

export default render;
