import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import ProductList from "../Components/Products/ProductList";

export default function ProductsListPage(props) {
  const { searchValue, categoryValue } = props;
  const { products, error } = useContext(GlobalContext);

  const tempProducts =
    searchValue.length > 0
      ? products.filter((product) =>
          product.product_name.toLowerCase().match(searchValue)
        )
      : categoryValue > ""
      ? products.filter(
          (product) =>
            product.category.toLowerCase() === categoryValue.toLowerCase()
        )
      : products;

  return (
    <div className="ProductsListPage">
      {error.length > 0 ? (
        <p className="error">There was an error</p>
      ) : (
        <ProductList products={tempProducts} />
      )}
    </div>
  );
}
