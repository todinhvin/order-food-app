import React, { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isHighLight, setIsHighLight] = useState(false);
  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) return;

    setIsHighLight(true);
    const timer = setTimeout(() => {
      setIsHighLight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const classBtn = `${classes.button} ${isHighLight && classes.bump}`;

  const totalAmounts = cartCtx.items.reduce((currentAmounts, item) => {
    return currentAmounts + item.amount;
  }, 0);
  return (
    <button className={classBtn} onClick={props.openCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{totalAmounts}</span>
    </button>
  );
};

export default HeaderCartButton;
