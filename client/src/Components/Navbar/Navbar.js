import React from "react";
import { NavLink } from "react-router-dom";
import Search from './Search';
import CartImg from "../Images/shopping-cart.svg";
import SideBar from './Sidebar';

export default function Navbar(props) {
  const { setSearchValue, setCategoryValue } = props;

  /* calculate total number of items in cart */
  const cartTotalItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    let total = 0;

    if (cart && cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity);
      });
    }

    return total;
  };

  /* calculate total amouont in cart */
  const cartSubTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;

    if (cart && cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity * product.price);
      });
    }

    return total.toFixed(2);
  };

  return (
    <header className="NavBar">
      <nav className="NavBar__navigation">
        <div className="NavBar__top">
          <div className="NavBar__logo">
            <NavLink to="/">Craft Store</NavLink>
          </div>

          <div className="spacer" />

          <div className="NavBar__search">
            <Search setSearchValue={setSearchValue} />
          </div>

          <div className="spacer" />

          <div className="NavBar__cart">
            <div className="NavBar__cart-info">
              <div className="NavBar__cart-info-totalItems">
                No. of items: {cartTotalItems()}
              </div>
              <div className="NavBar__cart-info-subTotal">
                Sub Total: $ {cartSubTotal()}
              </div>
            </div>
            <div className="NavBar__cart-icon">
              <NavLink to="/cart">
                <img src={CartImg} alt="Cart" />
              </NavLink>
            </div>
          </div>
        </div>
        <SideBar setCategoryValue={setCategoryValue} />
      </nav>
    </header>
  );
}
