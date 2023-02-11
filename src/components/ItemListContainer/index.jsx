import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import ProductCard from "../ProductCard";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { productosContext } from "../../App";

function ItemListContainer({ greeting }) {
  const productos = useContext(productosContext);
  const mapCategories = {
    herramientas: "Herramientas",
    deportes: "Deportes",
    moda: "Moda",
    salud: "Salud",
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
              producto.category === categoria || categoriaEstado === "todos"
          )
          .map((producto) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              image={producto.image}
              title={producto.title}
              description={producto.description}
              price={producto.price}
              categoriaProducto={producto.category}
              rating={producto.rating}
              stock={producto.stock}
            />
          ))}
      </SimpleGrid>
    </>
  );
}

export default ItemListContainer;
