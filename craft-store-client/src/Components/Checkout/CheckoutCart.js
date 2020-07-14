import React from "react";

export default function CheckoutCart(props) {
  const cart = props.cart;

  const renderCart = cart.map((item) => (
    <li key={item.product_id}>
      <div className="Checkout__cart-item Checkout__cart-image">
        <img src={item.image} alt={item.image} />
      </div>
      <div className="Checkout__cart-item">
        <span className="Checkout__cart-heading">Item: </span>
        {item.product_name}
      </div>
      <div className="Checkout__cart-item">
        <span className="Checkout__cart-heading">Quantity: </span>
        {item.quantity}
      </div>
      <div className="Checkout__cart-item">
        <span className="Checkout__cart-heading">Price: </span>$
        {parseFloat(item.price).toFixed(2)}
      </div>
    </li>
  ));

  const cartSubTotal = () => {
    let total = 0;

    if (cart.length > 0) {
      cart.map((product) => {
        return (total += product.quantity * product.price);
      });
    }

    return total.toFixed(2);
  }

  return (
    <React.Fragment>
      <h3>Cart: </h3>
      <ul className='Checkout__cart'>{renderCart}</ul>
      <div className="Checkout__cart-total"><span className="Checkout__cart-heading">Total: </span>${cartSubTotal()}</div>
    </React.Fragment>
  );
}
