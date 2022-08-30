import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

function Checkout() {
  const { itemsInCart, setItemsInCart } = useContext(CartContext);

  function decreaseQuantity(item) {
    if (item.quantity === 1) {
      removeItem(item);
    } else {
      const itemIndex = itemsInCart.findIndex(
        (object) => object.id === item.id
      );
      const newArray = itemsInCart.slice();
      newArray[itemIndex]["quantity"]--;
      setItemsInCart(newArray);
    }
  }

  function increaseQuantity(item) {
    const itemIndex = itemsInCart.findIndex((object) => object.id === item.id);
    const newArray = itemsInCart.slice();
    newArray[itemIndex]["quantity"]++;
    setItemsInCart(newArray);
  }

  function removeItem(item) {
    const itemIndex = itemsInCart.findIndex((object) => object.id === item.id);
    const newArray = itemsInCart.slice();
    newArray.splice(itemIndex, 1);
    setItemsInCart(newArray);
  }

  return (
    <div>
      <span>Product</span>
      <span>Description</span>
      <span>Quantity</span>
      <span>Price</span>
      <span>Remove</span>
      <div>
        {itemsInCart.map((item) => {
          const { id, imageUrl, name, quantity, price } = item;
          return (
            <div key={id}>
              <img src={imageUrl} alt={name} />
              <span>{name}</span>
              <span>
                <button onClick={() => decreaseQuantity(item)}>&lt;</button>
                {quantity}
                <button onClick={() => increaseQuantity(item)}>&gt;</button>
              </span>
              <span>{price}</span>
              <button onClick={() => removeItem(item)}>X</button>
            </div>
          );
        })}
      </div>
      <span>
        Total: $
        {itemsInCart.reduce(
          (previousTotal, item) => previousTotal + item.price * item.quantity,
          0
        )}
      </span>
    </div>
  );
}

export default Checkout;
