import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import ProductCard from "../ProductCard";
import { useLocation } from "react-router-dom";

function ItemListContainer({ productos, greeting }) {
  const mapCategories = {
    mujer: "women's clothing",
    hombre: "men's clothing",
    accesorios: "jewelery",
    electronica: "electronics",
  };

  const categoria = useLocation().pathname.split("/")[1] || "todos";
  const categoriaEstado = mapCategories[categoria] || "todos";

  return (
    <>
      <Box textAlign="center">
        <Heading
          as="h1"
          color="blue.400"
          fontSize="2xl"
          fontWeight="bold"
          lineHeight="tall"
          letterSpacing="wide"
          textAlign="center"
        >
          {greeting}
        </Heading>
      </Box>
      <SimpleGrid minChildWidth="250px" spacing="20px" m="6">
        {productos
          .filter(
            (producto) =>
              producto.category === categoriaEstado ||
              categoriaEstado === "todos"
          )
          .map((producto) => (
            <ProductCard
              id={producto.id}
              image={producto.image}
              title={producto.title}
              description={producto.description}
              price={producto.price}
            />
          ))}
      </SimpleGrid>
    </>
  );
}

export default ItemListContainer;
