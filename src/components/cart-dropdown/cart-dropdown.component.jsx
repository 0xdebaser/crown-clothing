import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

function CartDropdown() {
  const { itemsInCart, setShowDropDown } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <CartDropdownContainer>
      <CartItems>
        {itemsInCart.length > 0 ? (
          itemsInCart.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty.</EmptyMessage>
        )}
      </CartItems>
      <Button
        onClick={() => {
          navigate("../checkout");
          setShowDropDown(false);
        }}
      >
        Go to Checkout
      </Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
