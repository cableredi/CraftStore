import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../Context/ProductContext";

export default class CartTotals extends Component {
  static contextType = Context;

  state = {
    error: null,
  };

  /* Update New Totals */
  cartSubTotal(cart) {
    let total = 0;

    if (cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity * product.price);
      });
    }

    return total.toFixed(2);
  }

  /* Render */
  render() {
    const cart = JSON.parse(localStorage.getItem("cart"));

    let total = 0;
    total = parseFloat(
      cart.map((item) => total + item.price * item.quantity)
    ).toFixed(2);

    return (
      <div className="CartTotals">
        <div className="CartTotals__total-header">Total:</div>
        <div className="CartTotals__total">{this.cartSubTotal(cart)}</div>
        <div className="CartTotals__checkout">
          <NavLink to="/checkout">
            <button>Checkout</button>
          </NavLink>
        </div>
      </div>
    );
  }
}
