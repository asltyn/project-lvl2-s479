import defaultFormatter from './defaultFormatter';
import plainFormatter from './plainFormatter';
import jsonFormatter from './jsonFormatter';

export default (format) => {
  const formatters = {
    def: defaultFormatter,
    plain: plainFormatter,
    json: jsonFormatter,
  };
  return formatters[format];
};
