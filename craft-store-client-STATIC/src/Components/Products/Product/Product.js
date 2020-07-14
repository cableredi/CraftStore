import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Context from "../../../Context/Context";
import Counter from "../../Counter/Counter";

export default class Product extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      productDetail: {}
    };
  }

  addToCart = product => {
    product.inCart = true;
    this.context.addToCart(product);
  };

  render() {
    const { product } = this.props;

    return (
      <>
        <NavLink to={`/products/${product.product_id}`} className="Product__image">
          <img src={product.image} alt={product.} />
        </NavLink>

        <h4 className="Product__name"> {product.product_name} </h4>
        <p className="Product__price"> {product.price} </p>

        <div className="Product__quantity">
          <Counter
            product_id={product.product_id}
            availQuantity={product.available_quantity}
            currCount={product.cartCount}
            disabled={!product.inCart ? "" : "disables"}
          />
        </div>

        <div className="Product__button">
          <button
            className={!product.inCart ? "" : "added"}
            type="button"
            onClick={() => this.addToCart(product)}
          >
            {!product.inCart ? "ADD TO CART" : "✔ ADDED"}
          </button>
        </div>
      </>
    );
  }
}
