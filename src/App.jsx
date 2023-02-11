import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import NavBar from "./components/NavBar";
import CartWidget from "./components/CartWidget";
import ProductCard from "./components/ProductCard";
import { Navigate, Route, Routes } from "react-router-dom";
import { db } from "../db/firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import Spinner from "./components/Spinner";
import { createContext } from "react";
import BreadcrumbComp from "./components/Breadcrumb";
import Form from "./components/Form";
import AddProductForm from "./components/AddProductForm";
import CartPreview from "./components/CartPreview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./components/CheckOut";
import Purchases from "./components/Purchases";

const productosContext = createContext(null);
const cartContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const productosCollectionRef = collection(db, "products");
  const getProductos = async () => {
    const querySnapshot = await getDocs(productosCollectionRef);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductos(docs);
    setLoading(false);
  };

  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [userId, setUserId] = useState("");
  const [userNombre, setUserNombre] = useState("");
  const [userApellido, setUserApellido] = useState("");

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <productosContext.Provider value={productos}>
      <cartContext.Provider
        value={{
          cart,
          setCart,
          cartId,
          setCartId,
          userId,
          setUserId,
          userNombre,
          setUserNombre,
          userApellido,
          setUserApellido,
        }}
      >
        <NavBar CartWidget={CartWidget} />

        <Container width="100%" maxWidth="100vw" pl={0} pr={0} pt={10}>
          {loading && <Spinner />}
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />

            <Route
              path="/"
              element={
                <>
                  <ItemListContainer
                    ProductCard={ProductCard}
                    greeting="Bienvenido a nuestra tienda!"
                  />{" "}
                  <CartPreview />
                </>
              }
            />

            <Route
              path="/producto/:categoria/:id"
              element={
                <>
                  <BreadcrumbComp />
                  <ItemDetail />
                  <CartPreview />
                </>
              }
            />

            <Route
              path="/herramientas"
              element={
                <>
                  <ItemListContainer
                    ProductCard={ProductCard}
                    greeting="HERRAMIENTAS"
                  />{" "}
                  <CartPreview />
                </>
              }
            />
            <Route
              path="/deportes"
              element={
                <>
                  <ItemListContainer
                    ProductCard={ProductCard}
                    greeting="DEPORTES Y FITNESS"
                  />{" "}
                  <CartPreview />
                </>
              }
            />
            <Route
              path="/moda"
              element={
                <>
                  <ItemListContainer
                    ProductCard={ProductCard}
                    greeting="MODA"
                  />
                  <CartPreview />
                </>
              }
            />
            <Route
              path="/salud"
              element={
                <>
                  <ItemListContainer
                    ProductCard={ProductCard}
                    greeting="SALUD Y BELLEZA"
                  />
                  <CartPreview />
                </>
              }
            />
            <Route path="/usuario" element={<Form />} />
            <Route
              path="/admProductos"
              element={
                <>
                  <AddProductForm />
                </>
              }
            />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/miscompras" element={<Purchases />} />
          </Routes>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Container>
      </cartContext.Provider>
    </productosContext.Provider>
  );
}
export { productosContext, cartContext };
export default App;
