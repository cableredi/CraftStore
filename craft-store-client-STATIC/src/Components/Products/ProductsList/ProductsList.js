import React, { Component } from 'react';
import Product from '../Product/Product';

export default class ProductsList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  };

  render() {
    const products = this.props.products;

    const productItems = products.map(product =>
      <div className='Product' key={product.product_id}>
        <Product
          product={product}
        />
      </div>
    );

    return (
      <div className="ProductList">
        {productItems}
      </div>
    )
  }
}