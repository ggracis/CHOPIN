import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { db } from "../../../db/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect } from "react";
import ProductList from "../ProductList";
import useNotify from "../../hooks/useNotify";

const AddProductForm = () => {
  const { notify } = useNotify();

  const [products, setProductos] = useState([]);

  const productosCollectionRef = collection(db, "products");
  const getProductos = async () => {
    const querySnapshot = await getDocs(productosCollectionRef);
    const docs = querySnapshot.docs.map((doc) => doc.data());
    setProductos(docs);
    console.log(docs);
  };
  useEffect(() => {
    getProductos();
  }, []);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productRef = await addDoc(collection(db, "products"), {
      title,
      category,
      description,
      image,
      price,
      rating,
      stock,
    });

    const productId = productRef.id;
    console.log(`Producto agregado con el ID: ${productId}`);
    getProductos();
    notify("success", `Producto agregado con el ID: ${productId}`);
    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setPrice(0);
    setRating(0);
    setStock(0);
  };

  return (
    <Box maxW="700px" mx="auto" mt="4">
      <Text color="gray.500" fontSize="2em">
        Agregar un nuevo producto
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="title">Titulo</FormLabel>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="category">Categoría</FormLabel>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Elija una categoría</option>
            <option value="herramientas">Herramientas</option>
            <option value="deportes">Deportes y fitness</option>
            <option value="moda">Moda</option>
            <option value="salud">Salud y belleza</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Descripción</FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="image">URL de imagen</FormLabel>
          <Input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="price">Precio</FormLabel>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="rating">Rating</FormLabel>
          <Input
            id="rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="stock">Stock</FormLabel>
          <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </FormControl>
        <Button mt={4} type="submit">
          Agregar Producto
        </Button>
      </form>

      <ProductList products={products} />
    </Box>
  );
};

export default AddProductForm;
