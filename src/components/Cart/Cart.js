import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmounts = cartCtx.totalAmounts.toFixed(2);

  const onAddItem = (item) => {
    cartCtx.addItem(item);
  };

  const onRemoveItem = (id) => {
    cartCtx.deleteItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          price={item.price}
          name={item.name}
          amount={item.amount}
          onAdd={onAddItem.bind(null, { ...item, amount: 1 })}
          onRemove={onRemoveItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.closeCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmounts}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.closeCart}>
          Close
        </button>
        {cartCtx.items.length !== 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
