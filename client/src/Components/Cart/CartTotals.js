import React from "react";
import { NavLink } from "react-router-dom";

export default function CartTotals() {

  /* Update New Totals */
  const cartSubTotal = (cart) => {
    let total = 0;

    if (cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity * product.price);
      });
    }

    return total.toFixed(2);
  };

  const cart = JSON.parse(localStorage.getItem("cart"));

  let total = 0;
  total = parseFloat(
    cart.map((item) => total + item.price * item.quantity)
  ).toFixed(2);

  return (
    <div className="CartTotals">
      <div className="CartTotals__total-header">Total:</div>
      <div className="CartTotals__total">{cartSubTotal(cart)}</div>
      <div className="CartTotals__checkout">
        <NavLink to="/checkout">
          <button>Checkout</button>
        </NavLink>
      </div>
    </div>
  );
}
