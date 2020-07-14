import React from 'react';

export default function CartColumnHeaders() {
  return (
    <div className='CartColumn__header'>
      <div className='CartColumn__header-product'>
        Product
      </div>

      <div className='CartColumn__header-price'>
        Price
      </div>

      <div className='CartColumn__header-quantity'>
        Quantity
      </div>

      <div className='CartColumn__header-remove'>
        Remove
      </div>

      <div className='CartColumn__header-subTotal'>
        Sub Total
      </div>
    </div>
  )
}