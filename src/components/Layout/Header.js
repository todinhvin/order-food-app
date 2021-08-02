import React, { Fragment } from "react";

import mealsImg from "./../../assets/img/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <div className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton openCart={props.openCart} />
      </div>
      <div className={classes["header-img"]}>
        <img src={mealsImg} alt="Meals" />
      </div>
    </Fragment>
  );
};

export default Header;
