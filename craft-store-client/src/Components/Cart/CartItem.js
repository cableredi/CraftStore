import React, { Component } from "react";
import Counter from "../Counter/Counter";
import Context from "../../Context/ProductContext";
import Trash from "../Images/trash.svg";

export default class CartItem extends Component {
  static contextType = Context;

  /* Update context with cart count */
  handleCartCount = (id, count) => {
    this.context.updateCart(id, count);
  }

  /* Render */
  render() {
    const item = this.props.item;

    return (
      <>
        <div className="CartItem__img">
          <img src={item.image} alt={item.product_name} />
        </div>
        <div className='CartItem__header'>Product</div>
        <div className="CartItem__name">{item.product_name}</div>
        <div className='CartItem__header'>Price</div>
        <div className="CartItem__price">$ {item.price}</div>
        <div className='CartItem__header'>Quantity</div>
        <div className="CartItem__quantity">
          <Counter
            product_id={item.product_id}
            availQuantity={item.available_quantity}
            currCount={item.quantity}
            cartCount={ this.handleCartCount }
          />
        </div>
        <div className='CartItem__header'>Remove</div>
        <div className="CartItem__remove">
          <img 
            src={Trash} 
            alt="Remove Product"
            onClick= { () => this.context.removeFromCart(item.product_id) }
          />
        </div>
        <div className='CartItem__header'>Sub Total</div>
        <div className="CartItem__subTotal">
          {parseFloat(item.quantity * item.price).toFixed(2)}
        </div>
      </>
    );
  }
}
