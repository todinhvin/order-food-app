import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = () => {
  const [isShowCart, setIsShowCart] = useState(false);

  const closeCart = () => {
    setIsShowCart(false);
  };

  const openCart = () => {
    setIsShowCart(true);
  };

  return (
    <CartProvider>
      {isShowCart && <Cart closeCart={closeCart} />}
      <Header openCart={openCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
