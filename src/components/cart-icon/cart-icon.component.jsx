import { useContext } from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

import "./cart-icon.styles.scss";

function CartIcon() {
  const { showDropDown, setShowDropDown } = useContext(CartContext);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon
        className="shopping-icon"
        onClick={() => setShowDropDown(!showDropDown)}
      />
      <span className="item-count">0</span>
    </div>
  );
}

export default CartIcon;
