import _ from 'lodash';

const stringify = (node) => {
  //return node.type;
  switch (node.type) {
    case 'added': return [[`+  ${node.name}: `, f(node.newValue)]];
    case 'deleted': return [[`-  ${node.name}: `,f(node.oldValue)]];
    case 'unchanged': return [[`  ${node.name}: `,f(node.oldValue)]];
    case 'changed': return [[`-  ${node.name}: `,f(node.oldValue)],[`+  ${node.name}: `,f(node.newValue)]];
  }
}

const f = val => {
  if (typeof val !== 'object') return val;
  return Object.entries(val);
}

const render = (ast) => {
  return ast.reduce((acc,node) => node.type === 'inner' ? [...acc, [node.name, render(node.children)]] : [...acc, ...stringify(node)], []);
};

export default render;
