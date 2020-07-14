import React from "react";
import Product from "./Product";

export default function ProductList(props) {
  const { products } = props;

  const productItems = products.map((product) => (
    <div className="Product" key={product.product_id}>
      <Product product={product} />
    </div>
  ));

  return <div className="ProductList">{productItems}</div>;
}
