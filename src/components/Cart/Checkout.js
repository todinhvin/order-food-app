import React from "react";
import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    isError: nameIsError,
    handleChange: nameHandleChange,
    handleBlur: nameHandleBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    isError: phoneIsError,
    handleChange: phoneHandleChange,
    handleBlur: phoneHandleBlur,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAddress,
    isValid: addressIsValid,
    isError: addressIsError,
    handleChange: addressHandleChange,
    handleBlur: addressHandleBlur,
  } = useInput((value) => value.trim() !== "");

  let isOrder = false;

  if (nameIsValid && phoneIsValid && addressIsValid) {
    isOrder = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addCustomer({ enteredName, enteredPhone, enteredAddress });
  };

  return (
    <form className={classes["form-control"]} onSubmit={handleSubmit}>
      <div
        className={`${classes["form-input"]} ${nameIsError && classes.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          placeholder="Enter your name"
          value={enteredName}
          onChange={nameHandleChange}
          onBlur={nameHandleBlur}
        />
        {nameIsError && (
          <p className={classes["input-error"]}>Check your name!</p>
        )}
      </div>

      <div
        className={`${classes["form-input"]} ${
          phoneIsError && classes.invalid
        }`}
      >
        <label htmlFor="phone">Your phone</label>
        <input
          id="phone"
          placeholder="Enter your phone"
          value={enteredPhone}
          onChange={phoneHandleChange}
          onBlur={phoneHandleBlur}
        />
        {phoneIsError && (
          <p className={classes["input-error"]}>Check your phone!</p>
        )}
      </div>
      <div
        className={`${classes["form-input"]} ${
          addressIsError && classes.invalid
        }`}
      >
        <label htmlFor="address">Your address</label>
        <input
          id="address"
          placeholder="Enter your address"
          value={enteredAddress}
          onChange={addressHandleChange}
          onBlur={addressHandleBlur}
        />
        {addressIsError && (
          <p className={classes["input-error"]}>Check your address!</p>
        )}
      </div>
      <div className={classes["btn-control"]}>
        <button className={classes["btn-cancel"]} onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!isOrder} className={classes["btn-order"]}>
          Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
