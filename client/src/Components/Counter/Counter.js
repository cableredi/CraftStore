import React, { useState, useEffect } from "react";

export default function Counter(props) {
  const { currCount, disabled, product_id, availQuantity, onCartCount } = props;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (currCount) {
      setCartCount(currCount);
    }
  }, [currCount]);

  /* Increment cart count by 1 */
  const increment = (id, availQty) => {
    const count = cartCount + 1 <= availQty ? cartCount + 1 : cartCount;

    setCartCount(count);
    onCartCount(id, count);
  };

  /* Decrement cart count by 1 */
  const decrement = (id) => {
    const count = cartCount - 1 <= 0 ? 0 : cartCount - 1;

    setCartCount(count);
    onCartCount(id, count);
  };

  return (
    <>
      <button
        className="Product__quantity-decrement"
        disabled={disabled}
        onClick={() => decrement(product_id)}
      >
        -
      </button>

      <div className="Product__quantity-count">{cartCount}</div>

      <button
        className="Product__quantity-increment"
        disabled={disabled}
        onClick={() => increment(product_id, availQuantity)}
      >
        +
      </button>
    </>
  );
}
