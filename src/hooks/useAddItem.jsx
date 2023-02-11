import { useContext } from "react";
import { cartContext } from "../App";

import useNotify from "./useNotify";
import { productosContext } from "../App";

export const useAddItem = () => {
  const { notify } = useNotify();
  const productos = useContext(productosContext);
  const { cart, setCart } = useContext(cartContext);

  const addItem = (item, amount, price) => {
    const itemInCart = cart.find((i) => i.item.id === item.id);
    const product = productos.find((p) => p.id === item.id);

    // Arma el objeto que se va a guardar en el carrito
    if (itemInCart) {
      // Verifica si la cantidad agregada supera el stock
      if (product.stock < itemInCart.amount + amount) {
        notify(
          "error",
          `No se puede agregar ${amount} unidades, solo quedan ${product.stock}`
        );
        return;
      }
      // Ya estaba en el carrito
      console.log(`Producto ${item.id}  ya estaba en carrito`);
      itemInCart.amount += amount;
      itemInCart.price = price;
      const updatedCart = [...cart];
      setCart(updatedCart);
      console.log("Cart actualizado >>: ", JSON.stringify(updatedCart));
    } else {
      // Agregar al carrito
      console.log(`Agregando producto ${item.id} al carrito`);
      const updatedCart = { item, amount, price };
      setCart([...cart, updatedCart]);
      console.log("Cart actualizado >>: ", JSON.stringify(updatedCart));
    }
    notify("success", `Producto agregado al carrito`);
  };

  return addItem;
};
