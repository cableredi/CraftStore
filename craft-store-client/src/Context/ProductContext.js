import React, { Component } from "react";

const ProductContext = React.createContext({
  products: [],
  cart: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setProducts: () => {},
  addToCart: () => {},
  updateCart: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
});

export default ProductContext;

export class ProductProvider extends Component {
  state = {
    products: [],
    cart: [],
    error: null,
  };

  /* Set error message */
  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  /* Clear error message */
  clearError = () => {
    this.setState({ error: null });
  };

  /* Set products from database */
  setProducts = (products) => {
    this.setState({
      products: products,
    });
  };

  /* Add to Cart */
  handleAddToCart = (selectedProduct, quantity) => {
    let tempCart = JSON.parse(localStorage.getItem("cart"));

    if (!tempCart) {
      tempCart = [];
    }

    const newProduct = {
      product_id: selectedProduct.product_id,
      product_name: selectedProduct.product_name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: quantity,
      available_quantity: selectedProduct.available_quantity,
    };

    tempCart.push(newProduct);

    this.setState({
      cart: tempCart,
    });

    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  /* check if cart product is in database */
  checkProduct(productID) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart.some(function (item) {
      return item.product_id === productID;
    });
  }

  /* Update cart */
  handleUpdateCart = (id, quantity) => {
    const tempCart = JSON.parse(localStorage.getItem("cart"));

    if (quantity > 0) {
      if (tempCart.length > 0) {
        const selectedCart = tempCart.find((item) => item.product_id === id);

        selectedCart.quantity = quantity;

        this.setState({
          cart: this.state.cart.map((cartItem) =>
            cartItem.product_id !== Number(selectedCart.product_id)
              ? cartItem
              : selectedCart
          ),
        });

        const newCart = tempCart.map((cartItem) =>
          cartItem.product_id !== Number(selectedCart.product_id)
            ? cartItem
            : selectedCart
        );

        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    } else {
      this.removeFromCart(id);
    }
  };

  /* Remove item from cart */
  removeFromCart = (id) => {
    const tempCart = JSON.parse(localStorage.getItem("cart"));

    let index = tempCart.findIndex((item) => item.product_id === id);
    tempCart.splice(index, 1);

    this.setState({
      cart: tempCart,
    });

    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  /* Empty Cart */
  emptyCart = () => {
    this.setState({ cart: [] });
    localStorage.removeItem("cart");
  };

  render() {
    const value = {
      products: this.state.products,
      cart: this.state.cart,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setProducts: this.setProducts,
      addToCart: this.handleAddToCart,
      updateCart: this.handleUpdateCart,
      removeFromCart: this.removeFromCart,
      emptyCart: this.emptyCart,
    };

    return (
      <ProductContext.Provider value={value}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
