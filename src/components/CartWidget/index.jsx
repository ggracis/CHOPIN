//Indicador de cantidad de productos en el carrito
import {
  Icon,
  Badge,
  Flex,
  Link,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuButton,
  Menu,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { cartContext } from "../../App";

const CartWidget = () => {
  const { cart } = useContext(cartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Flex align="center">
      <Menu>
        <Link as={MenuButton}>
          <Icon as={AiOutlineShoppingCart} color="white" boxSize={10} />
        </Link>
        <Badge
          p="2"
          mt="6"
          ml="-2"
          borderRadius="full"
          fontWeight="bold"
          fontSize="xs"
          variant="solid"
          colorScheme="teal"
        >
          {totalItems}
        </Badge>
        <MenuList>
          <MenuGroup>
            <MenuItem>
              <NavLink to="/checkout">Finalizar compra</NavLink>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CartWidget;
