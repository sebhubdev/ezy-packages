import React from "react";
import BaseField from "./BaseField";

const SearchField = (
  { arrayToSearch = [], propsToSearch = [], onSearch = () => {} },
  ...props
) => {
  const deepMatchFiltered = (obj, regex) => {
    if (typeof obj === "string" || typeof obj === "number") {
      return regex.test(String(obj));
    }

    if (Array.isArray(obj)) {
      return obj.some((item) => deepMatchFiltered(item, regex));
    }

    if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some((value) =>
        deepMatchFiltered(value, regex),
      );
    }

    return false;
  };

  const search = (query, props) => {
    const regex = new RegExp(query, "i");

    const newArr = arrayToSearch.filter((item) =>
      props.some((prop) => deepMatchFiltered(item[prop], regex)),
    );
    onSearch(newArr, query);
  };

  const handleSearch = (query) => {
    search(query, propsToSearch);
  };

  return (
    <div className="search mb-8">
      <BaseField
        type="text"
        type="text"
        label="Recherche..."
        icon="search"
        placeholder="Nom, Prenom..."
        onChange={handleSearch}
        {...props}
      />
    </div>
  );
};

export default SearchField;
