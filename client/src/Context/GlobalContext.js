import React, { createContext, useReducer } from "react";
import ProductsReducer from './ProductsReducer';
import CartReducer from './CartReducer';
import GeneralReducer from './GeneralReducer';

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [products, dispatchProducts] = useReducer(ProductsReducer, []);
  const [cart, dispatchCart] = useReducer(CartReducer, []);
  const [error, dispatchGeneral] = useReducer(GeneralReducer, []);

  const setError = (error) => {
    dispatchGeneral({
      type: "SET_ERROR",
      payload: error,
    });
  };

  const setProducts = (products) => {
    dispatchProducts({
      type: "SET_PRODUCTS",
      payload: products,
    });
  };

  const addCart = (selectedProduct, quantity) => {
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

    dispatchCart({
      type: "ADD_CART",
      payload: newProduct,
    });

    tempCart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  const updateCart = (id, quantity) => {
    const tempCart = JSON.parse(localStorage.getItem("cart"));

    if (quantity > 0) {
      if (tempCart.length > 0) {
        const selectedCart = tempCart.find((item) => item.product_id === id);

        selectedCart.quantity = quantity;

        dispatchCart({
          type: "UPDATE_CART",
          payload: selectedCart,
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

  const removeCart = (id) => {
    const tempCart = JSON.parse(localStorage.getItem("cart"));

    let index = tempCart.findIndex((item) => item.product_id === id);
    tempCart.splice(index, 1);

    dispatchCart({
      type: "REMOVE_CART",
      payload: id,
    });

    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  const emptyCart = () => {
    dispatchCart({
      type: 'EMPTY_CART',
      payload: []
    })

    localStorage.removeItem("cart");
  }

  return (
    <GlobalContext.Provider
      value={{
        error: error,
        setError,
        products: products,
        cart: cart,
        setProducts,
        addCart,
        updateCart,
        removeCart,
        emptyCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
