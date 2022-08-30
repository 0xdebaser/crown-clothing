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
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCount = itemsInCart.reduce(
      (previousValue, item) => previousValue + item.quantity,
      0
    );
    setCartCount(newCount);
    const newTotal = itemsInCart.reduce(
      (previousTotal, item) => previousTotal + item.price * item.quantity,
      0
    );
    setCartTotal(newTotal);
  }, [itemsInCart]);

  function addItemToCart(productToAdd) {
    setItemsInCart(addCartItem(itemsInCart, productToAdd));
  }

  function removeItemFromCart(item) {
    const itemIndex = itemsInCart.findIndex((object) => object.id === item.id);
    const newArray = itemsInCart.slice();
    newArray.splice(itemIndex, 1);
    setItemsInCart(newArray);
  }

  function decreaseQuantity(item) {
    if (item.quantity === 1) {
      removeItemFromCart(item);
    } else {
      const itemIndex = itemsInCart.findIndex(
        (object) => object.id === item.id
      );
      const newArray = itemsInCart.slice();
      newArray[itemIndex]["quantity"]--;
      setItemsInCart(newArray);
    }
  }

  const value = {
    itemsInCart,
    setItemsInCart,
    showDropDown,
    setShowDropDown,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    decreaseQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// img src={imageUrl} alt={name} />
// <h2>{name}</h2>
// <span>
//   <button onClick={() => decreaseQuantity(item)}>&lt;</button>
//   {quantity}
//   <button onClick={() => addItemToCart(item)}>&gt;</button>
// </span>
// <span>{price}</span>
// <button onClick={() => removeItemFromCart(item)}>X</button>
