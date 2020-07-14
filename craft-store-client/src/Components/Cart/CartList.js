import React, { Component } from "react";
import ProductContext from "../../Context/ProductContext";
import CartItem from "./CartItem";
import CartColumnHeaders from "./CartColumnHeaders";
import CartTotals from "./CartTotals";

export default class CartList extends Component {
  static contextType = ProductContext;

  /* Render */
  render() {
    const cart = JSON.parse(localStorage.getItem("cart"));

    return (
      <div className="CartList">
        <CartColumnHeaders />

        {cart.map((item) => {
          return (
            <div className="CartItem" key={item.product_id}>
              <CartItem item={item} />
            </div>
          );
        })}

        <CartTotals />
      </div>
    );
  }
}
