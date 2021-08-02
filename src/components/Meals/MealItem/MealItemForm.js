import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

function MealItemForm(props) {
  const amountRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const onAddMeal = (event) => {
    event.preventDefault();
    const amount = amountRef.current.value;
    if (
      amount.trim().length === 0 ||
      +amount < props.minAmount ||
      amount > props.maxAmount
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
      props.handleAddItem(amount);
    }
  };
  return (
    <form className={classes.form} onSubmit={onAddMeal}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: `amount-${props.id}`,
          type: "number",
          min: props.minAmount,
          max: props.maxAmount,
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {isValid && <p className={classes.valid}>Check amount</p>}
    </form>
  );
}

export default MealItemForm;
