import React from "react";
import { useHistory } from "react-router-dom";

export default function Landing(props) {
  const { setCategoryValue } = props;
  const history = useHistory();

  const handleClick = (value) => {
    setCategoryValue(value);
    history.push("/products");
  };

  return (
    <div className="Landing">
      <div
        className="Landing__product"
        onClick={() => handleClick("stained")}
      >
        <h2>Stained Glass</h2>
        <p>
          Check out our beautiful selection of stained glass. Each piece is
          handmade and beautifully crafted
        </p>
      </div>
      <div
        className="Landing__product"
        onClick={() => handleClick("fused")}
      >
        <h2>Fused Glass</h2>
        <p>
          Check out our beautiful selection of fused glass. Each piece is kiln
          fired to exquisite perfection
        </p>
      </div>
    </div>
  );
}
