import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

function CartDropdown() {
  const { itemsInCart, setShowDropDown } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {itemsInCart.length > 0
          ? itemsInCart.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))
          : "Your cart is empty."}
      </div>
      <Button
        onClick={() => {
          navigate("../checkout");
          setShowDropDown(false);
        }}
      >
        Go to Checkout
      </Button>
    </div>
  );
}

export default CartDropdown;
