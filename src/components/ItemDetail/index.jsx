import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const ItemDetail = ({ productos }) => {
  const idProducto = useLocation().pathname.split("/")[2];
  const producto = productos[idProducto];
  console.log(producto);

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  const { image, title, description, price } = producto;

  return (
    <Flex align="center" justify="center" direction="column" p={8}>
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
        <Image src={image} alt={title} objectFit="cover" />
        <Box p="6">
          <Heading as="h4" size="md">
            {title}
          </Heading>
          <Text mt="1" fontSize="sm" color="gray.500">
            {description}
          </Text>
          <Stack isInline mt={4}>
            <Text fontWeight="bold" fontSize="lg" color="green.500">
              ${price}
            </Text>
            <Button
              size="sm"
              onClick={() => {
                // Add product to cart
              }}
            >
              Add to Cart
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default ItemDetail;
