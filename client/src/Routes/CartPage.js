import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import CartList from "../Components/Cart/CartList";

export default function CartPage() {
  const { error } = useContext(GlobalContext);

  /* Render */
  const cart = JSON.parse(localStorage.getItem("cart"));

  return (
    <div className="Cart">
      <h1 className="Cart__heading">Shopping Cart</h1>
      {error && <p className="error">{error}</p>}

      {cart && cart.length > 0 ? <CartList /> : "Cart is currently empty"}
    </div>
  );
}
