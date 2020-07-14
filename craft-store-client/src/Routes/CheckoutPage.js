import React, { Component } from "react";
import Context from '../Context/ProductContext';
import ShippingAddress from '../Components/Checkout/ShippingAddress/ShippingAddress';
import CheckoutCart from '../Components/Checkout/CheckoutCart';
import PayPalButton from '../Components/Checkout/PayPalButton';

export default class Checkout extends Component {
  static contextType = Context;

  state = {
    addressConfirmed: false,
  };

  setAddressConfirmed = () => {
    //this.setState({ addressConfirmed: true });
  };

  cartSubTotal = (cart) => {
    let total = 0;

    if (cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity * product.price);
      });
    }

    return total.toFixed(2);
  };

  /* Render */
  render() {
    const cart = JSON.parse(localStorage.getItem("cart"));

    return (
      <div className="Checkout">
        <h1 className="Checkout__heading">Checkout</h1>
        {cart && cart.length > 0 ? (
          <React.Fragment>
            <div className="Checkout__card">
              <CheckoutCart cart={cart} />
            </div>
            <div className="Checkout__card">
              <ShippingAddress addressConfirmed={this.setAddressConfirmed} />
            </div>
            {this.state.addressConfirmed ? (
              <div className="Checkout__card">
                <PayPalButton total={this.cartSubTotal(cart)} history={this.props.history} />
              </div>
            ) : null}
          </React.Fragment>
        ) : (
          "Cart is currently empty"
        )}
      </div>
    );
  }
}
