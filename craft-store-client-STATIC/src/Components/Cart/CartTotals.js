import React, { Component } from "react";
import Context from "../../Context/Context";

export default class CartTotals extends Component {
  static contextType = Context;

  render() {
    const cart = this.props.cart;

    let total = 0;
    total = cart.map( item => total + item.price);
    
    return (
      <div className="CartTotals">
        <div className='CartTotals__total-header'>
          Total:
        </div>
        <div className='CartTotals__total'>
          {total}
        </div>        
      </div>
    );
  }
}
