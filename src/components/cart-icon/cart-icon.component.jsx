import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

function CartIcon() {
  const { showDropDown, toggleDropDown, cartCount } = useContext(CartContext);

  return (
    <CartIconContainer>
      <ShoppingIcon onClick={toggleDropDown} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
