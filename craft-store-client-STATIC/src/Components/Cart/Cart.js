import React from 'react';
import CartList from './CartList';

export default function Cart(props) {
  return (
    <div className='Cart'>
      { props.cart.length > 0
        ? <CartList list={props.cart} />
        : 'Cart is currently empty'
      }
      
    </div>
  )
}