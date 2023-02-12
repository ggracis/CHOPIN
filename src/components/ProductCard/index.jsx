// Tarjeta de producto reutilizable
import React, { useContext } from "react";
import { StarIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Box,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useAddItem } from "../../hooks/useAddItem";

const formatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const ProductCard = ({
  categoriaProducto,
  id,
  image,
  title,
  price,
  rating,
  stock,
}) => {
  const addItem = useAddItem();

  return (
    <div>
      <Card maxW="sm" shadow="md" borderWidth="1px" borderRadius="lg">
        <CardBody p="6">
          <NavLink to={`/producto/${categoriaProducto}/${id}`}>
            <Image src={image} alt={title} title={title} borderRadius="md" />
          </NavLink>
          <Stack mt="6" spacing="3">
            <NavLink to={`/producto/${categoriaProducto}/${id}`}>
              <Heading size="md">{title}</Heading>
            </NavLink>

            <Box display="flex" mt="2" alignItems="center">
              <Text fontWeight="bold" fontSize="xl" color="green.400">
                {formatter.format(price)}
              </Text>
            </Box>

            <Divider />

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
        </CardBody>

        <Divider />

        <CardFooter d="flex" justifyContent="space-between" p="6">
          <ButtonGroup spacing="2">
            {/*       <Button size="sm" variant="outline" colorScheme="teal">
              Comprar
            </Button> */}
            <Button
              size="sm"
              variant="outline"
              colorScheme="teal"
              onClick={() => addItem({ id }, 1, parseInt(price))}
            >
              Agregar al carrito
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
