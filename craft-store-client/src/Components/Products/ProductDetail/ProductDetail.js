import React, { Component } from "react";
import Context from "../../../Context/ProductContext";
import { NavLink } from "react-router-dom";
import Counter from "../../Counter/Counter";

export default class ProductDetail extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      productDetail: {},
      cartCount: 0,
    };
  }

  /* Add to Cart */
  addToCart = (product) => {
    this.context.addToCart(product, this.state.cartCount);
  };

  /* Update State with cart count */
  handleCartCount = (id, count) => {
    this.setState({
      cartCount: count,
    });
  };

  /* Render */
  render() {
    const product = this.props.product;
    const cart = JSON.parse(localStorage.getItem("cart"));
    const item = cart
      ? cart.find((item) => item.product_id === product.product_id)
      : null;

    return (
      <React.Fragment>
        <div className="ProductDetail">
          <div className="ProductDetail__back">
            <NavLink to="/products">
              <span className="ProductDetail__back-arrow">←</span> Back to
              Products
            </NavLink>
          </div>

          <div className="ProductDetail__image">
            <img src={product.image} alt={product.product_name} />
          </div>

          <div className="ProductDetail__cart-details">
            <div className="ProductDetail__name">{product.product_name}</div>

            <div className="ProductDetail__price">
              {parseFloat(product.price).toFixed(2)}
            </div>

            <div className="Product__quantity">
              <Counter
                product_id={product.product_id}
                availQuantity={product.available_quantity}
                currCount={item ? item.quantity : product.quantity}
                cartCount={this.handleCartCount}
              />
            </div>

            <div className="ProductDetail__button">
              <button
                className={!item ? "" : "added"}
                type="button"
                onClick={() => this.addToCart(product)}
              >
                {!item ? "ADD TO CART" : "✔ ADDED"}
              </button>
            </div>
          </div>
        </div>

        <div className="ProductDetail__product-information">
          <div className="ProductDetail__header">Description:</div>

          <div className="ProductDetail__description">
            {product.description}
          </div>

          <div className="ProductDetail__header">Measurements:</div>

          <div className="ProductDetail__measurements">
            {product.measurements}
          </div>

          <div className="ProductDetail__header">How Made:</div>

          <div className="ProductDetail__how">{product.how_made}</div>

          <div className="ProductDetail__header">Care Instructions:</div>

          <div className="ProductDetail__care">{product.care_instructions}</div>
        </div>
      </React.Fragment>
    );
  }
}
