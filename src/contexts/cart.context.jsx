import { createContext, useState } from "react";

export const CartContext = createContext({
  itemsInCart: [],
  setItemsInCart: null,
  showDropDown: false,
  setShowDropDown: null,
});

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const value = { itemsInCart, setItemsInCart, showDropDown, setShowDropDown };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
