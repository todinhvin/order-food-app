import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const isError = !isValid && isTouched;

  const handleChange = (event) => {
    setEnteredValue(event.target.value);
  };

  const handleBlur = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    isValid,
    isError,
    handleBlur,
    handleChange,
    reset,
  };
};

export default useInput;
