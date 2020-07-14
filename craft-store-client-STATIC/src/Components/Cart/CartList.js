import React from 'react';
import CartItem from './CartItem';
import CartColumnHeaders from './CartColumnHeaders';
import CartTotals from './CartTotals';

export default function CartList(props) {

  return (
    <div className='CartList'>
      <CartColumnHeaders />
      
      {props.list.map(item => {
        return (
          <div className='CartItem' key={item.product_id}>
            <CartItem
              item={item}
            />
          </div>
        )
      })}

      <CartTotals cart={props.list} />
    </div>
  )
}