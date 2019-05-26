import yaml from 'js-yaml';
import ini from 'ini';

export default (fileType) => {
  const parsers = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  return parsers[fileType];
};
