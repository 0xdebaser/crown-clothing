import { useContext } from "react";

import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";

function CheckoutItem({ cartItem }) {
  const { id, imageUrl, name, quantity, price } = cartItem;
  const { removeItemFromCart, addItemToCart, decreaseQuantity } =
    useContext(CartContext);

  function incrementHandler() {
    addItemToCart(cartItem);
  }

  function decrementHandler() {
    decreaseQuantity(cartItem);
  }

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={decrementHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incrementHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div
        className="remove-button"
        onClick={() => removeItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
}

export default CheckoutItem;
