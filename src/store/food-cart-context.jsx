import { createContext, useReducer, useState } from "react";

export const CartContext = createContext({
  items: [],
  carts: [],
  addItem: (items) => {},
  deleteItem: (item) => {},
  addItemToCart: (item) => {},
  clearItemInCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    return { ...state, items: action.items };
  }

  if (action.type === "ADD_ITEM_TO_CART") {
    const updatedCarts = [...state.carts];

    const existingCartItemIndex = state.carts.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingCartItemIndex > -1) {
      const existingCartItem = state.carts[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedCarts[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCarts.push({ ...action.item, quantity: 1 });
    }

    return { ...state, carts: updatedCarts };
  }

  if (action.type === "DELETE_ITEM") {
    let updatedCarts = [...state.carts];

    const existingCartItemIndex = state.carts.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.carts[existingCartItemIndex];

    if (existingCartItem.quantity > 1) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedCarts[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCarts.splice(existingCartItemIndex, 1);
    }

    return { ...state, carts: updatedCarts };
  }

  if (action.type === "CLEAR_ITEM") {
    console.log(state);
    return { ...state, carts: [] };
  }
}

export default function CartContextProvider({ children }) {
  const [mealCartState, mealCartDispatch] = useReducer(cartReducer, {
    items: [],
    carts: [],
  });

  function handleAddMeals(items) {
    mealCartDispatch({
      type: "ADD_ITEM",
      items,
    });
  }

  function handleAddItemToCart(item) {
    mealCartDispatch({
      type: "ADD_ITEM_TO_CART",
      item,
    });
  }

  function handleDeleteItemInCart(item) {
    mealCartDispatch({
      type: "DELETE_ITEM",
      id: item.id,
    });
  }

  function handleClearItemInCart() {
    mealCartDispatch({
      type: "CLEAR_ITEM",
    });
  }

  const ctxValue = {
    items: mealCartState.items,
    carts: mealCartState.carts,
    addItemToCart: handleAddItemToCart,
    addItem: handleAddMeals,
    deleteItem: handleDeleteItemInCart,
    clearItemInCart: handleClearItemInCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
