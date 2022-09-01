import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

function CartIcon() {
  const { showDropDown, setShowDropDown, cartCount } = useContext(CartContext);

  return (
    <CartIconContainer>
      <ShoppingIcon onClick={() => setShowDropDown(!showDropDown)} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
