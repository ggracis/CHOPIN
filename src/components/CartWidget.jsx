//Indicador de cantidad de productos en el carrito
import {
  Icon,
  Badge,
  Flex,
  Box,
  Link,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuButton,
  Menu,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const CartWidget = () => {
  return (
    <Flex align="center">
        <Menu>
      <Link as={MenuButton}>
        <Icon as={AiOutlineShoppingCart} color="white" boxSize={10} />
      </Link>
      <Badge p="1" mt="6" ml="-2" bg="blue.300" borderRadius="lg">
       3
      </Badge>
      <MenuList>
        <MenuGroup>
          <MenuItem>Mi carrito</MenuItem>
          <MenuItem>Finalizar compra</MenuItem>
        </MenuGroup>
      </MenuList>
      </Menu>
    </Flex>
  );
};

export default CartWidget;