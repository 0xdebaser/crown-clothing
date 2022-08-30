import { createContext, useEffect, useState } from "react";

function addCartItem(itemsInCart, productToAdd) {
  //find if itemsInCart contains productToAdd
  const itemIndex = itemsInCart.findIndex(
    (item) => item.id === productToAdd.id
  );
  //if found, increment quantity
  if (itemIndex > -1) {
    const newArray = itemsInCart.slice();
    newArray[itemIndex]["quantity"]++;
    return newArray;
  } else {
    //if not found, add to array
    return [...itemsInCart, { ...productToAdd, quantity: 1 }];
  }
}

export const CartContext = createContext({
  itemsInCart: [],
  setItemsInCart: null,
  showDropDown: false,
  setShowDropDown: null,
});

export function CartProvider({ children }) {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCount = itemsInCart.reduce(
      (previousValue, item) => previousValue + item.quantity,
      0
    );
    setCartCount(newCount);
  }, [itemsInCart]);

  function addItemToCart(productToAdd) {
    setItemsInCart(addCartItem(itemsInCart, productToAdd));
  }

  const value = {
    itemsInCart,
    setItemsInCart,
    showDropDown,
    setShowDropDown,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
