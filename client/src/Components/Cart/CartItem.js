import React, { useContext } from "react";
import Counter from "../Counter/Counter";
import Trash from "../Images/trash.svg";
import { GlobalContext } from "../../Context/GlobalContext";

export default function CartItem(props) {
  const { item } = props;
  const { removeCart, updateCart } = useContext(GlobalContext);

  /* Update context with cart count */
  const handleCartCount = (id, count) => {
    updateCart(id, count);
  };


  return (
    <>
      <div className="CartItem__img">
        <img src={item.image} alt={item.product_name} />
      </div>
      <div className="CartItem__header">Product</div>
      <div className="CartItem__name">{item.product_name}</div>
      <div className="CartItem__header">Price</div>
      <div className="CartItem__price">$ {item.price}</div>
      <div className="CartItem__header">Quantity</div>
      <div className="CartItem__quantity">
        <Counter
          product_id={item.product_id}
          availQuantity={item.available_quantity}
          currCount={item.quantity}
          onCartCount={handleCartCount}
        />
      </div>
      <div className="CartItem__header">Remove</div>
      <div className="CartItem__remove">
        <img
          src={Trash}
          alt="Remove Product"
          onClick={() => removeCart(item.product_id)}
        />
      </div>
      <div className="CartItem__header">Sub Total</div>
      <div className="CartItem__subTotal">
        {parseFloat(item.quantity * item.price).toFixed(2)}
      </div>
    </>
  );
}
