import React, { Component } from "react";
import ProductContext from "../../Context/ProductContext";

export default class Counter extends Component {
  static contextType = ProductContext;

  constructor(props) {
    super(props);
    this.state = {
      cartCount: this.props.currCount || 0,
    };
  }

  /* Update state with Cart Count and pass count back to parent */
  setCartCount = (id, count) => {
    this.setState({
      cartCount: count,
    });

    this.props.cartCount(id, count);
  };

  /* Increment cart count by 1 */
  increment = (id, availQty) => {
    const count =
      this.state.cartCount + 1 <= availQty
        ? this.state.cartCount + 1
        : this.state.cartCount;

    this.setCartCount(id, count);
  };

  /* Decrement cart count by 1 */
  decrement = (id) => {
    const count = this.state.cartCount - 1 <= 0 ? 0 : this.state.cartCount - 1;

    this.setCartCount(id, count);
  };

  /* Render */
  render() {
    const { product_id, availQuantity } = this.props;

    return (
      <>
        <button
          className="Product__quantity-decrement"
          disabled={this.props.disabled}
          onClick={() => this.decrement(product_id)}
        >
          -
        </button>

        <div className="Product__quantity-count">{this.state.cartCount}</div>

        <button
          className="Product__quantity-increment"
          disabled={this.props.disabled}
          onClick={() => this.increment(product_id, availQuantity)}
        >
          +
        </button>
      </>
    );
  }
}
