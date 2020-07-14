import React, { Component } from "react";
import Counter from "../../Counter/Counter";
import Context from "../../../Context/Context";

export default class ProductDetail extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      productDetail: {},
    };
  }

  addToCart = (product) => {
    product.inCart = true;

    this.context.addToCart(product);
  };

  render() {
    const product = this.props.product;

    return (
      <React.Fragment>
        <div className="ProductDetail">
          <div className="ProductDetail__image">
            <img src={product.image} alt={product.product_name} />
          </div>
          <div className="ProductDetail__cart-details">
            <div className="ProductDetail__name">{product.product_name}</div>
            <div className="ProductDetail__price">{product.price}</div>
            <div className="ProductDetail__quantity">
              <Counter
                product_id={product.product_id}
                availQuantity={product.available_quantity}
                currCount={product.cartCount}
                disabled={!product.inCart ? "" : "disables"}
              />
            </div>
            <div className="ProductDetail__button">
              <button
                className={!product.inCart ? "" : "added"}
                type="button"
                onClick={() => this.addToCart(product)}
              >
                {!product.inCart ? "ADD TO CART" : "✔ ADDED"}
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
