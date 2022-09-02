import { createContext, useReducer } from "react";

export const CartContext = createContext({
  itemsInCart: null,
  showDropDown: false,
  cartCount: 0,
  cartTotal: 0,
});

export const CART_ACTION_TYPES = {
  TOGGLE_DROP_DOWN: "TOGGLE_DROP_DOWN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

function cartReducer(state, action) {
  const { type, payload } = action;
  const { showDropDown } = state;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_DROP_DOWN:
      return {
        ...state,
        showDropDown: !showDropDown,
      };
    default:
      throw new Error(`Unhandled type in cartReducer: ${type}`);
  }
}

const INTIAL_STATE = {
  itemsInCart: [],
  showDropDown: false,
  cartCount: 0,
  cartTotal: 0,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, INTIAL_STATE);

  const { itemsInCart, showDropDown, cartCount, cartTotal } = state;

  function updateCartItemsReducer(newCartItems) {
    //generate new cartCount
    const newCartCount = newCartItems.reduce(
      (previousValue, item) => previousValue + item.quantity,
      0
    );
    //generate new cartTotal
    const newCartTotal = newCartItems.reduce(
      (previousTotal, item) => previousTotal + item.price * item.quantity,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        itemsInCart: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  }

  function addItemToCart(item) {
    //find if itemsInCart contains productToAdd
    const itemIndex = itemsInCart.findIndex((object) => object.id === item.id);
    //if found, increment quantity
    if (itemIndex > -1) {
      const newArray = itemsInCart.slice();
      newArray[itemIndex]["quantity"]++;
      updateCartItemsReducer(newArray);
    } else {
      //if not found, add to array
      updateCartItemsReducer([...itemsInCart, { ...item, quantity: 1 }]);
    }
  }

  function removeItemFromCart(item) {
    const indexToRemove = itemsInCart.findIndex(
      (object) => object.id === item.id
    );
    const newArray = itemsInCart.slice();
    newArray.splice(indexToRemove, 1);
    updateCartItemsReducer(newArray);
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
      updateCartItemsReducer(newArray);
    }
  }

  function toggleDropDown() {
    dispatch({
      type: CART_ACTION_TYPES.TOGGLE_DROP_DOWN,
    });
  }

  const value = {
    itemsInCart,
    showDropDown,
    toggleDropDown,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    decreaseQuantity,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
