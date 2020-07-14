import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import CartImg from "../Images/shopping-cart.svg";
import Search from "../Search/Search";
import SideBar from "./SideBar";

export default class Navbar extends Component {
  static contextType = ProductContext;

  /* calculate total number of items in cart */
  cartTotalItems() {
    const cart = JSON.parse(localStorage.getItem("cart"));

    let total = 0;

    if (cart && cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity);
      });
    }

    return total;
  }

  /* calculate total amouont in cart */
  cartSubTotal() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;

    if (cart && cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity * product.price);
      });
    }

    return total.toFixed(2);
  }

  render() {
    return (
      <header className="NavBar">
        <nav className="NavBar__navigation">
          <div className="NavBar__top">
            <div className="NavBar__logo">
              <NavLink to="/">Craft Store</NavLink>
            </div>

            <div className="spacer" />

            <div className="NavBar__search">
              <Search setSearchValue={this.props.setSearchValue} />
            </div>

            <div className="spacer" />

            <div className="NavBar__cart">
              <div className="NavBar__cart-info">
                <div className="NavBar__cart-info-totalItems">
                  No. of items: {this.cartTotalItems()}
                </div>
                <div className="NavBar__cart-info-subTotal">
                  Sub Total: $ {this.cartSubTotal()}
                </div>
              </div>
              <div className="NavBar__cart-icon">
                <NavLink to="/cart">
                  <img src={CartImg} alt="Cart" />
                </NavLink>
              </div>
            </div>
          </div>
          <SideBar setCategoryValue={this.props.setCategoryValue} />
        </nav>
      </header>
    );
  }
}
