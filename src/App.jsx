import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import NavBar from "./components/NavBar";
import CartWidget from "./components/CartWidget";
import ProductCard from "./components/ProductCard";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
/* import Breadcrumb from "./components/Breadcrumb";
 */
function App() {
  const [productos, setProductos] = useState([]);

  const getProductos = () => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      console.log(response.data);
      setProductos(response.data);
    });
  };
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Container width="100%" maxWidth="100vw" padding={0}>
      <NavBar CartWidget={CartWidget} />
      {/*       <Breadcrumb />
       */}
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/"
          element={
            <ItemListContainer
              ProductCard={ProductCard}
              productos={productos}
              greeting="Bienvenido a nuestra tienda!"
            />
          }
        />
        <Route
          path="/producto/:id"
          element={<ItemDetail productos={productos} />}
        />

        <Route
          path="/mujer"
          element={
            <ItemListContainer
              ProductCard={ProductCard}
              productos={productos}
              greeting="Productos seleccionados para mujeres"
            />
          }
        />
        <Route
          path="/hombre"
          element={
            <ItemListContainer
              ProductCard={ProductCard}
              productos={productos}
              greeting="Productos seleccionados para hombres"
            />
          }
        />
        <Route
          path="/accesorios"
          element={
            <ItemListContainer
              ProductCard={ProductCard}
              productos={productos}
              greeting="Nuestros accesorios"
            />
          }
        />
        <Route
          path="/electronica"
          element={
            <ItemListContainer
              ProductCard={ProductCard}
              productos={productos}
              greeting="Productos de electrónica"
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
