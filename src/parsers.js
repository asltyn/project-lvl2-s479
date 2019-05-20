import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (pathToFile) => {
  const parsers = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
    '.ini': ini.parse,
  };
  const getAbsolutePath = p => (path.isAbsolute(p) ? p : path.resolve('./', p));
  return parsers[path.extname(pathToFile)](fs.readFileSync(getAbsolutePath(pathToFile), 'UTF-8'));
};
