import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (pathToFile) => {
  const parsers = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
  };
  const getAbsolutePath = p => (path.isAbsolute(p) ? p : path.resolve('./', p));
  return parsers[path.extname(pathToFile)](fs.readFileSync(getAbsolutePath(pathToFile), 'UTF-8'));
};
