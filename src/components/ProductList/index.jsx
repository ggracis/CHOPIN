import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../db/firebase-config";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useNotify from "../../hooks/useNotify";

const ProductList = () => {
  const { notify } = useNotify();
  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  const getProductos = async () => {
    const querySnapshot = await getDocs(productsCollectionRef);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(docs);
  };

  const handleDelete = async (id) => {
    //   await deleteDoc(doc(db, "products", id));
    notify("info", `Producto con ID ${id} eliminado (falso)`);
    getProductos();
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <Box maxW="800px" mx="auto" mt="20">
      <Text color="gray.500" fontSize="2em">
        Productos existentes:
      </Text>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} ({product.category})
            <IconButton
              m="2"
              variant="outline"
              colorScheme="teal"
              aria-label="Send email"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(product.id)}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default ProductList;
