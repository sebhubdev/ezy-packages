const getEmptyByType = (type) => {
  switch (type) {
    case "array":
      return [];
    case "object":
      return {};
    case "string":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    default:
      return null;
  }
};

export default getEmptyByType;
