import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformData = (meals) => {
      const transformValue = [];
      for (const key in meals) {
        transformValue.push({
          id: key,
          ...meals[key],
        });
      }
      setMeals(transformValue);
    };
    fetchMeals(
      { url: "https://reactjs-19f5e-default-rtdb.firebaseio.com/meals.json" },
      transformData
    );
  }, [fetchMeals]);

  let content;
  if (meals.length === 0) {
    content = <p className="notice">Not found available meals</p>;
  } else {
    content = meals.map((meal) => {
      return (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      );
    });
  }

  if (isLoading) {
    content = <p className="notice">Loading ...</p>;
  }

  if (error) {
    content = <p className="notice">{error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
