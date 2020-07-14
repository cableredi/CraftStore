import React, { Component } from 'react';
import Context from '../../Context/Context';

export default class Counter extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      cartCount: this.props.currCount
    }
  }

  increment = () => {
    this.setState(
      prevState => ({
        cartCount: Number(prevState.cartCount + 1) <= this.props.availQuantity 
          ? Number(prevState.cartCount + 1) 
          : prevState.cartCount
      }), () => this.context.updateProduct(this.props.product_id, this.state.cartCount)
    )
  };

  decrement = () => {
    this.setState(
      prevState => ({
        cartCount: Number(prevState.cartCount - 1) <= 0 
          ? 0 
          : Number(prevState.cartCount - 1)
      }), () => this.context.updateProduct(this.props.product_id, this.state.cartCount)
    )
  }

  render() {
    return (
      <>
        <button
          className='Product__quantity-decrement'
          disabled={this.props.disabled}
          onClick={this.decrement}
        >
          -
        </button>

        <div className='Product__quantity-count'>
          {this.state.cartCount}
        </div>

        <button
          className='Product__quantity-increment'
          disabled={this.props.disabled}
          onClick={this.increment}
        >
          +
        </button>
      </>
    )
  }
}