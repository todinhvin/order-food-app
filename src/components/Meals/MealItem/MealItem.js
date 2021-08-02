import React, { Fragment, useContext } from "react";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const handleAddItem = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      description: props.description,
      price: props.price,
      amount: +amount,
    });
  };
  return (
    <Fragment>
      <div className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <p className={classes.description}>{props.description}</p>
          <p className={classes.price}>{price}</p>
        </div>
        <MealItemForm
          minAmount="1"
          maxAmount="5"
          handleAddItem={handleAddItem}
        />
      </div>
    </Fragment>
  );
};

export default MealItem;
