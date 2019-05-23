import defaultFormatter from './formatters/defaultFormatter';
import plainFormatter from './formatters/plainFormatter';
import jsonFormatter from './formatters/jsonFormatter';

export default (format) => {
  const formatters = {
    def: defaultFormatter,
    plain: plainFormatter,
    json: jsonFormatter,
  };
  return formatters[format];
};
