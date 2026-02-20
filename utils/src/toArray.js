const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export default toArray;
