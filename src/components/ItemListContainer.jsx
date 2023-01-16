// Lista de productos
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

function ItemListContainer({ productos, greeting }) {
  return (
    <>
      <Box textAlign="center">
        <Heading as="h1"
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
        {productos.map((producto) => {
          return (
            <ProductCard
              key={producto.id}
              image={producto.image}
              title={producto.title}
              description={producto.description}
              price={producto.price}
            />
          );
        })}
      </SimpleGrid>
    </>
  );
}

export default ItemListContainer;
