import React, { useContext, useState } from "react";

import {
  Box,
  Image,
  Text,
  Stack,
  Flex,
  Button,
  useColorModeValue,
  IconButton,
  ButtonGroup,
  Icon,
} from "@chakra-ui/react";

import { cartContext, productosContext } from "../../App";
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useWindowSize from "react-use-window-size";
import { NavLink } from "react-router-dom";
import styles from "./CartPreview.module.css";

const CartPreview = () => {
  const productos = useContext(productosContext);
  const { cart } = useContext(cartContext);

  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const { removeFromCart } = useRemoveFromCart();
  const windowSize = useWindowSize();
  const cartHeight = cart.length * 60 + 10;
  const shouldShowScroll = windowSize.height * 0.3 < cartHeight;

  const [isCartOpen, setIsCartOpen] = useState(true);

  const totalDinero = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  return (
    cart.length > 0 && (
      <Box
        className={styles.cartpreview}
        padding="10px"
        position="fixed"
        bottom="0px"
        right="20px"
        marginLeft="20px"
        max-width="90vw"
        zIndex="1"
      >
        <Flex align="center" justify="space-between">
          <Text m={2} color={"gray.300"}>
            <b>Total:</b> {formatter.format(totalDinero)}
          </Text>
          <ButtonGroup>
            <IconButton
              m="2"
              colorScheme={"teal"}
              icon={isCartOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}
              onClick={() => setIsCartOpen(!isCartOpen)}
              title={`${isCartOpen ? "Ocultar" : "Mostrar"} carrito`}
            />
            <Button m="2" colorScheme={"teal"}>
              <NavLink to="/checkout">Finalizar compra</NavLink>
            </Button>
          </ButtonGroup>
        </Flex>

        {isCartOpen && (
          <Box
            style={{ overflowY: shouldShowScroll ? "scroll" : "none" }}
            height={`${Math.min(cartHeight, windowSize.height * 0.3)}px`}
          >
            <Stack spacing="10px">
              {cart.map((product) => {
                const producto = productos.find(
                  (p) => p.id === product.item.id
                );
                return (
                  <Flex align="center" key={product.item.id}>
                    <Image
                      src={producto.image}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="5px"
                      alt={producto.title}
                      title={producto.title}
                    />
                    <Box ml="10px">
                      <Text fontWeight="bold" fontSize="xs" color={"gray.300"}>
                        {producto.title}
                      </Text>
                      <Text color={"gray.500"}>
                        {formatter.format(product.price)} x {product.amount}
                      </Text>
                    </Box>

                    <IconButton
                      m="2"
                      colorScheme={useColorModeValue("whiteAlpha", "teal")}
                      icon={<DeleteIcon />}
                      onClick={() => removeFromCart(product.item.id)}
                      title="Eliminar producto"
                    />
                  </Flex>
                );
              })}
            </Stack>
          </Box>
        )}
      </Box>
    )
  );
};

export default CartPreview;
