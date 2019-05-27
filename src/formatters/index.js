import defaultFormatter from './defaultFormatter';
import plainFormatter from './plainFormatter';

export default (format) => {
  const formatters = {
    def: defaultFormatter,
    plain: plainFormatter,
    json: JSON.stringify,
  };
  return formatters[format];
};
