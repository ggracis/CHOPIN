import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Flex,
  Button,
  Divider,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { cartContext } from "../../App";
import { productosContext } from "../../App";
import { StarIcon } from "@chakra-ui/icons";
import { useAddItem } from "../../hooks/useAddItem";

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const ItemDetail = () => {
  const { cart, setCart, cartId, setCartId } = useContext(cartContext);
  const addItem = useAddItem();
  const productos = useContext(productosContext);
  const pathname = useLocation().pathname;
  const paths = pathname.split("/");
  const idProducto = paths.pop();
  const producto = productos.find((producto) => producto.id == idProducto);
  const [amount, setAmount] = useState(1);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const { id, image, title, description, price, rating, stock } = producto;

  return (
    <Flex align="center" justify="center" direction="column">
      <Box maxW="md" borderWidth="1px" rounded="lg" overflow="hidden">
        <Image src={image} alt={title} objectFit="cover" />
        <Box p="6">
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Text mt="1" fontSize="sm" color="gray.500">
            {description}
          </Text>
          <Stack isInline mt={4}>
            <Box display="flex" mt="2" alignItems="center">
              <Text fontWeight="bold" fontSize="2em" color="green.400">
                {formatter.format(price)}
              </Text>
            </Box>
            <Box display="flex" mt="2" alignItems="center">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    size="12px"
                    color={i < rating ? "teal.500" : "gray.300"}
                  />
                ))}
              <Text ml="2" color="gray.500" fontSize="sm">
                {stock} en stock
              </Text>
            </Box>
          </Stack>
          <Divider m={5} />
          <ButtonGroup spacing="2">
            <NumberInput
              min={1}
              max={stock}
              value={amount}
              onChange={setAmount}
            >
              {" "}
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              size="sm"
              variant="outline"
              colorScheme="teal"
              onClick={() => addItem({ id }, parseInt(amount), parseInt(price))}
            >
              Agregar al carrito
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Flex>
  );
};

export default ItemDetail;
