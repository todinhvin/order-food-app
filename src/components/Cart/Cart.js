import React, { Fragment, useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";

import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const {
    isLoading: isLoadingSendOrder,
    error: errorOrder,
    sendRequest: sendOrderRequest,
  } = useHttp();
  const [isOrder, setIsOrder] = useState(false);
  const [isShowOrder, setIsShowOrder] = useState(false);

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

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      setIsShowOrder(false);
    }
  }, [cartCtx.items.length]);

  const onShowOrder = () => {
    setIsShowOrder(true);
  };

  const addOrder = (userData) => {
    setIsOrder(true);
    sendOrderRequest(
      {
        url: "https://reactjs-19f5e-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: { ...userData, meals: { ...cartCtx.items } },
      },
      (data) => {
        cartCtx.clearCart();
      }
    );
  };

  const buttonContent = !isShowOrder ? (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.closeCart}>
        Close
      </button>
      {cartCtx.items.length !== 0 && (
        <button className={classes.button} onClick={onShowOrder}>
          Order
        </button>
      )}
    </div>
  ) : (
    <Checkout onCancel={props.closeCart} addCustomer={addOrder} />
  );

  const cartModal = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmounts}</span>
      </div>

      {buttonContent}
    </Fragment>
  );

  let orderModal;
  if (isLoadingSendOrder) {
    orderModal = <p className="notice">Watting order...</p>;
  } else if (errorOrder) {
    orderModal = <p className="notice">Failing order...</p>;
  } else {
    orderModal = <p className="notice">Thanks for order...</p>;
  }

  return (
    <Modal onClick={props.closeCart}>
      {!isOrder && cartModal}
      {isOrder && orderModal}
    </Modal>
  );
};

export default Cart;
