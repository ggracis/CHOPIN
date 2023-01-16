import { useState } from "react";
import {
  Container,
} from "@chakra-ui/react";
import products from "../products.json";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";

function App() {
  const [productos, setProductos] = useState([]);

  return (
    <Container width="100%" maxWidth="100vw">
      <NavBar/>
      <ItemListContainer productos={products} greeting="Bienvenido a nuestra tienda!" />
          </Container>
  );
}

export default App;
