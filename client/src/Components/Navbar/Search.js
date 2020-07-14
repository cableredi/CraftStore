import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Search(props) {
  const { setSearchValue } = props;
  const [searchString, setSearchString] = useState("");

  const history = useHistory();

  const handleChange = (value) => {
    setSearchString(value);
    setSearchValue(value);

    history.push("/products");
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search items"
        value={searchString}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
