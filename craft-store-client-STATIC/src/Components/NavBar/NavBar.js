import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Context from '../../Context/Context';
import CartImg from '../Images/shopping-cart.svg';
import Search from '../Search/Search';

export default class Navbar extends Component {
  static contextType = Context;

  render() {

    return (
      <header className="NavBar">
        <nav className="NavBar__navigation">
          <div className="NavBar__top">
            <div className="NavBar__logo">
              <NavLink to='/'>
                Craft Store
              </NavLink>
            </div>

            <div className="spacer" />

            <div className="NavBar__search">
              <Search />
            </div>

            <div className="spacer" />

            <div className="NavBar__cart">
              <div className="NavBar__cart-info">
                <div className='NavBar__cart-info-totalItems'>No. of items: {this.context.cartTotalItems}</div>
                <div className='NavBar__cart-info-subTotal'>Sub Total: $ {this.context.cartSubTotal}</div>
              </div>
              <div className="NavBar__cart-icon">
                <NavLink to='/cart'>
                  <img src={CartImg} alt='Cart' />
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}