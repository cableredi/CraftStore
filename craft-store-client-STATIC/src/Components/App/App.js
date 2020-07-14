import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProductsApiService from "../../Services/products-api-service";
import Context from "../../Context/Context";

import NavBar from "../NavBar/NavBar";
import Landing from "../Landing/Landing";
import NotFound from "../NotFound/NotFound";
import ProductsList from "../Products/ProductsList/ProductsList";
import ProductDetail from "../Products/ProductDetail/ProductDetail";
import Cart from "../Cart/Cart";
import SideBar from "../NavBar/SideBar";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      cartTotalItems: 0,
      cartSubTotal: 0,
      searchValue: '',
      categoryValue: '',
    };
  }

  setSearchValue = (value) => {
    this.setState({ 
      searchValue: value
    })
  }
  
  setCategoryValue = (value) => {
    this.setState({ 
      categoryValue: value
    })
  }

  getProducts = () => {
    ProductsApiService.getAll()
      .then(res => res.json())
      .then(data => {
        const tempProducts = data.products.map(item => {
          let newData = Object.assign({}, item);

          newData.inCart = false;
          newData.cartCount = 0;

          return newData;
        });

        this.setState({
          products: tempProducts
        });
      });
  };

  getItem = id => {
    return this.state.products.find(item => item.product_id === id);
  };

  handleAddToCart = selectedProduct => {
    let cartItem = this.state.cart;
    let productID = selectedProduct.product_id;
    let productQty = selectedProduct.cartCount;

    const newProduct = {
      product_id: selectedProduct.product_id,
      product_name: selectedProduct.product_name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: selectedProduct.cartCount,
      available_quantity: selectedProduct.available_quantity
    };

    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(x => x.product_id === productID);

      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);

      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(newProduct);
    }

    this.setState({
      cart: cartItem
    });

    this.sumTotalItems();
    this.sumTotalAmount();
  };

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.product_id === productID;
    });
  }

  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;

    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity;
    }

    this.setState({
      cartTotalItems: total
    });
  }

  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;

    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }

    this.setState({
      cartSubTotal: total
    });
  }

  handleProduct = (id, quantity) => {
    let tempProducts = [...this.state.products];
    const selectedProduct = tempProducts.find(item => item.product_id === id);

    selectedProduct.cartCount = quantity;

    this.setState({
      products: this.state.products.map(product =>
        product.product_id !== Number(selectedProduct.product_id) ? product : selectedProduct
      )
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const contextValue = {
      products: [],
      cartTotalItems: this.state.cartTotalItems,
      cartSubTotal: this.state.cartSubTotal,
      cart: this.state.cart,
      searchValue: this.state.searchValue,
      categoryValue: this.state.categoryValue,
      addToCart: this.handleAddToCart,
      updateProduct: this.handleProduct,
      setSearchValue: this.setSearchValue,
      setCategoryValue: this.setCategoryValue,
    };

    let searchTerms = new RegExp(this.state.searchValue);

    return (
      <Context.Provider value={contextValue}>
        <NavBar />
        <SideBar />

        <div className="sectionSpacer"></div>

        <Switch>
          <Route exact path="/" component={Landing} />

          <Route
            exact
            path="/products"
            component={routeProps => (
              <ProductsList 
                products={ this.state.searchValue.length > 0
                  ? this.state.products.filter( product => product.product_name.toLowerCase().match(searchTerms) )
                  : this.state.categoryValue > ''
                    ? this.state.products.filter( product => product.category.toLowerCase() === this.state.categoryValue.toLowerCase() )
                    : this.state.products
                } 
                {...routeProps}
              />
            )}
          />

          <Route
            exact
            path="/products/:product_id"
            component={routeProps => (
              <ProductDetail
                product={this.state.products.find(
                  product => product.product_id === Number(routeProps.match.params.product_id)
                )}
                {...routeProps}
              />
            )}
          />

          <Route
            exact
            path="/cart"
            component={routeProps => (
              <Cart cart={this.state.cart} {...routeProps} />
            )}
          />

          <Route component={NotFound} />
        </Switch>
      </Context.Provider>
    );
  }
}
