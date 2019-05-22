import defaultFormatter from './formatters/defaultFormatter';
import plainFormatter from './formatters/plainFormatter';

export default (format) => {
  const formatters = {
    def: defaultFormatter,
    plain: plainFormatter,
  };
  return formatters[format];
};
