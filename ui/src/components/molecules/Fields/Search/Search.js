import React from "react";
import Input from "@ezycore/ui/components/molecules/Fields/Input";

function Search({
  arrayToSearch = [],
  propsToSearch = [],
  onSearch = () => {},
}) {
  const deepMatchFiltered = (obj, regex) => {
    if (typeof obj === "string" || typeof obj === "number") {
      return regex.test(String(obj));
    }

    if (Array.isArray(obj)) {
      return obj.some((item) => deepMatchFiltered(item, regex));
    }

    if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some((value) =>
        deepMatchFiltered(value, regex)
      );
    }

    return false;
  };

  const search = (query, props) => {
    const regex = new RegExp(query, "i");

    const newArr = arrayToSearch.filter((item) =>
      props.some((prop) => deepMatchFiltered(item[prop], regex))
    );
    onSearch(newArr, query);
  };

  const handleSearch = (e) => {
    const query = e.target.value;

    search(query, propsToSearch);
  };

  return (
    <div className="search mb-8">
      <Input
        type="text"
        label="Recherche..."
        icon="search"
        placeholder="Nom, Prenom..."
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
