import React from 'react';

const Context = React.createContext({
  products: [],
  cartTotalItems: 0,
  cartSubTotal: 0,
  cart: [],
  searchValue: '',
  categoryValue: '',
  addToCart: () => {},
  updateProduct: () => {},
  setSearchValue: () => {},
  setCategoryValue: () => {},
});

export default Context;