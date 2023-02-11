import { useContext } from "react";
import { cartContext } from "../App";

const useRemoveFromCart = () => {
  const { cart, setCart } = useContext(cartContext);

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.item.id !== itemId));
  };

  return { removeFromCart };
};

export default useRemoveFromCart;
