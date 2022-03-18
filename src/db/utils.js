export const extractPrefixedColumns = ({
    prefixedObject,
    prefix,
  }) => {
    const prefixRexp = new RegExp(`^${prefix}_(.*)`);
    return Object.entries(prefixedObject).reduce(
      (acc, [key, value]) => {
        const match = key.match(prefixRexp);
        if (match) {
          acc[match[1]] = value;
        }
        return acc;
      },
      {},
    );
  };