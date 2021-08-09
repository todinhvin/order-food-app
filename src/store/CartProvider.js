import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmounts: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updateItems;

    const updateTotalAmounts =
      state.totalAmounts + action.item.price * action.item.amount;
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    if (itemIndex > -1) {
      updateItems = [...state.items];
      let updateItem = {
        ...updateItems[itemIndex],
        amount: updateItems[itemIndex].amount + action.item.amount,
      };
      updateItems[itemIndex] = updateItem;
    } else {
      updateItems = state.items.concat(action.item);
    }
    return {
      items: updateItems,
      totalAmounts: updateTotalAmounts,
    };
  }
  if (action.type === "REMOVE") {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);
    let updateItems = [...state.items];
    let updateItem = updateItems[itemIndex];

    if (updateItem.amount === 1) {
      updateItems = updateItems.filter((item) => item.id !== action.id);
    } else {
      updateItem = {
        ...updateItem,
        amount: updateItem.amount - 1,
      };
      updateItems[itemIndex] = updateItem;
    }
    const updateTotalAmount = state.totalAmounts - updateItem.price;
    return {
      items: updateItems,
      totalAmounts: updateTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCart;
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCart);
  const addItem = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const deleteItem = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const clearCart = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartCtx = {
    items: cartState.items,
    totalAmounts: cartState.totalAmounts,
    addItem,
    deleteItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
