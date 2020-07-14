import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from '../../Context/GlobalContext';
import Counter from '../Counter/Counter';

export default function Product(props) {
  const [cartCount, setCartCount] = useState(0);
  const { product } = props;
  const { addCart } = useContext(GlobalContext);

  const cart = JSON.parse(localStorage.getItem("cart"));

  const item = cart
    ? cart.find((item) => Number(item.product_id) === product.product_id)
    : "";

  const handleAddToCart = (product) => {
    addCart(product, cartCount);
  };

  const handleCartCount = (id, count) => {
    setCartCount(count);
  };

  return (
    <>
      <NavLink
        to={`/products/${product.product_id}`}
        className="Product__image"
      >
        <img src={product.image} alt={product.image} />
      </NavLink>

      <h4 className="Product__name"> {product.product_name} </h4>
      <p className="Product__price"> {parseFloat(product.price).toFixed(2)} </p>

      <div className="Product__quantity">
        <Counter
          product_id={product.product_id}
          availQuantity={product.available_quantity}
          currCount={item ? item.quantity : product.quantity}
          onCartCount={handleCartCount}
        />
      </div>

      <div className="Product__button">
        <button
          className={!item ? "" : "added"}
          type="button"
          onClick={() => handleAddToCart(product)}
        >
          {!item ? "ADD TO CART" : "✔ ADDED"}
        </button>
      </div>
    </>
  );
}
