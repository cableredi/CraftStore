import React, { Component } from "react";
import Context from "../../Context/ProductContext";
import CartList from "./CartList";

export default class Cart extends Component {
  static contextType = Context;

  /* Render */
  render() {
    const cart = JSON.parse(localStorage.getItem("cart"));

    return (
      <div className="Cart">
        <h1 className="Cart__heading">Shopping Cart</h1>
        {this.context.error && <p className="error">{this.context.error}</p>}

        {cart && cart.length > 0 ? <CartList /> : "Cart is currently empty"}
      </div>
    );
  }
}
