import React from "react";
import Product from "../Product/Product";

export default function ProductsList(props) {
  const products = props.products;

  const productItems = products.map((product) => (
    <div className="Product" key={product.product_id}>
      <Product product={product} />
    </div>
  ));

  return <div className="ProductList">{productItems}</div>;
}
