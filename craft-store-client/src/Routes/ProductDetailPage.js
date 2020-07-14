import React, { Component } from "react";
import ProductContext from "../Context/ProductContext";
import ProductDetail from "../Components/Products/ProductDetail/ProductDetail";

export default class ProductDetailPage extends Component {
  static contextType = ProductContext;

  render() {
    const { products } = this.context;
    const {
      match: { params },
    } = this.props;

    const product = products.find(
      (product) => product.product_id === Number(params.product_id)
    );

    return <ProductDetail product={product} />;
  }
}
