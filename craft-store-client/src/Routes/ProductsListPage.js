import React, { Component } from "react";
import ProductContext from "../Context/ProductContext";
import ProductsApiService from "../Services/products-api-service";
import ProductsList from '../Components/Products/ProductsList/ProductsList';

export default class ProductsListPage extends Component {
  static contextType = ProductContext;

  componentDidMount() {
    ProductsApiService.getAll()
      .then(this.context.setProducts)
      .catch(this.context.setError);
  }

  render() {
    const { products } = this.context;
    const { searchValue, categoryValue } = this.props;

    const tempProducts = searchValue.length > 0
      ? products.filter( product => product.product_name.toLowerCase().match(searchValue))
      : categoryValue > ''
        ? products.filter(product => product.category.toLowerCase() === categoryValue.toLowerCase())
        : products


    const { error } = this.context;

    return (
      <div className="ProductsListPage">
        {error ? (
          <p className="error">There was an error</p>
        ) : (
          <ProductsList products={tempProducts} />
        )}
      </div>
    );
  }
}
