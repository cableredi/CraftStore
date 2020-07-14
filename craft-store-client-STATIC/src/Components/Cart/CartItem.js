import React from 'react';
import Counter from '../Counter/Counter';
import Trash from '../Images/trash.svg';

export default function CartItem(props) {
  const item = props.item;

  return (
    <>
      <div className='CartItem__img'>
        <img src={item.image} alt={item.product_name} />
      </div>
      <div className='CartItem__name'>
        {item.product_name}
      </div>
      <div className='CartItem__price'>
        $ {item.price}
      </div>
      <div className='CartItem__quantity'>
        <Counter product_id={item.product_id} availQuantity={item.available_quantity} currCount={item.quantity} />
      </div>
      <div className='CartItem__remove'>
        <img src={Trash} alt='Remove Product' />
      </div>
      <div className='CartItem__subTotal'>
        {item.quantity * item.price}
      </div>
    </>
  )
}