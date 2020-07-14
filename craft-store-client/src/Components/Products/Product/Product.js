import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../../Context/ProductContext";
import Counter from '../../Counter/Counter';

export default class Product extends Component {
  static contextType = Context;

  state = {
    cartCount: 0,
  };

  addToCart = (product) => {
    this.context.addToCart(product, this.state.cartCount);
  };

  handleCartCount = (id, count) => {
    this.setState({
      cartCount: count,
    })
  }

  render() {
    const { product } = this.props;
    const cart = JSON.parse(localStorage.getItem("cart"));
    const item = cart
      ? cart.find((item) => Number(item.product_id) === product.product_id)
      : null;

    return (
      <>
        <NavLink
          to={`/products/${product.product_id}`}
          className="Product__image"
        >
          <img src={product.image} alt={product.image} />
        </NavLink>

        <h4 className="Product__name"> {product.product_name} </h4>
        <p className="Product__price">
          {" "}
          {parseFloat(product.price).toFixed(2)}{" "}
        </p>

        <div className="Product__quantity">
          <Counter
            product_id={product.product_id}
            availQuantity={product.available_quantity}
            currCount={item ? item.quantity : product.quantity}
            cartCount={ this.handleCartCount }
          />
        </div>

        <div className="Product__button">
          <button
            className={!item ? "" : "added"}
            type="button"
            onClick={() => this.addToCart(product)}
          >
            {!item ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
      </>
    );
  }
}
