import React, { useContext, useState, useEffect } from "react";
import { ArrowForwardIcon, DeleteIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { cartContext, productosContext } from "../../App";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import { db } from "../../../db/firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import useNotify from "../../hooks/useNotify";

const CheckOut = () => {
  const { notify } = useNotify();

  const productos = useContext(productosContext);
  const {
    cart,
    cartId,
    userId,
    setCartId,
    setUserId,
    userNombre,
    setUserNombre,
    userApellido,
    setUserApellido,
  } = useContext(cartContext);
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const { removeFromCart } = useRemoveFromCart();
  const totalDinero = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailVerificacion, setEmailVerificacion] = useState("");
  const [isEmailsMatching, setIsEmailsMatching] = useState(true);
  const [isInvalid, setIsInvalid] = useState(true);

  let idUsuario = "";

  useEffect(() => {
    if (userId) {
      const ref = doc(db, "users", userId);
      getDoc(ref).then((userDoc) => {
        if (userDoc.exists) {
          console.log("Usuario encontrado: ", userDoc.data());
          setNombre(userDoc.data().nombre);
          setApellido(userDoc.data().apellido);
          setEmail(userDoc.data().email);
          setTelefono(userDoc.data().telefono);
          setUserNombre(userDoc.data().nombre);
          setUserApellido(userDoc.data().apellido);
        }
      });
    }
  }, [userId]);

  const saveUser = async () => {
    // Buscar usuario en la base de datos
    const q = query(collection(db, "users"), where("email", "==", email));
    const userQuerySnapshot = await getDocs(q);
    if (!userQuerySnapshot.empty) {
      console.log("Usuario encontrado: ", userQuerySnapshot.docs[0].id);
      setUserId(userQuerySnapshot.docs[0].id);
      idUsuario = userQuerySnapshot.docs[0].id;

      // Actualizar usuario
      console.log("Actualizando usuario: ", userQuerySnapshot.docs[0].id);
      const userDocRef = doc(db, "users", userQuerySnapshot.docs[0].id);
      await updateDoc(userDocRef, {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        timestamp: serverTimestamp(),
      });
    } else {
      // Crear usuario
      console.log("Creando usuario...");
      const newDocRef = await addDoc(collection(db, "users"), {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        timestamp: serverTimestamp(),
      });

      setUserId(newDocRef.id);
      idUsuario = newDocRef.id;
      console.log("UserId creado: ", newDocRef.id);
    }
  };

  const saveCart = async (cartId) => {
    if (cartId) {
      // Actualizar carrito
      console.log("Actualizando carrito: ", cartId);
      const cartDocRef = doc(db, "carts2", cartId);
      await updateDoc(cartDocRef, {
        items: cart,
        user: userId,
        timestamp: serverTimestamp(),
      });
      notify(
        "success",
        `¡Gracias por tu compra, ${nombre}! 🎉 - Id de compra: ${cartId}`
      );
    } else {
      // Crear carrito
      console.log("Creando carrito...");
      const newDocRef = await addDoc(collection(db, "carts2"), {
        items: cart,
        user: idUsuario,
        timestamp: serverTimestamp(),
      });
      setCartId(newDocRef.id);
      console.log("CartId creado: ", newDocRef.id);
      notify(
        "success",
        `¡Gracias por tu compra, ${nombre}! 🎉 - Id de compra: ${newDocRef.id}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      console.log(
        notify(
          "error",
          `👀 ${nombre}! 🎉 - El carrito está vacío, agrega algún producto antes de enviar`
        )
      );
      console.log(cart);
    } else if (!isInvalid) {
      await saveUser(userId);
      await saveCart(cartId);
    } else {
      console.log("No se puede mandar el formulario");
      setIsInvalid(true);
    }
  };

  useEffect(() => {
    if (emailVerificacion !== email) {
      setIsEmailsMatching(false);
      setIsInvalid(true);
      console.log("No coinciden");
    } else if (email || emailVerificacion !== "") {
      setIsEmailsMatching(true);
      setIsInvalid(false);
      console.log("Coinciden");
    }
  }, [emailVerificacion, email]);

  const handleMailVerification = (event) => {
    setEmailVerificacion(event.target.value);
  };

  return (
    <Box maxW="700px" mx="auto" mt="2em" mb="10em">
      <Stack spacing="10px">
        {
          /* Listado de productos */
          cart.map((product) => {
            const producto = productos.find((p) => p.id === product.item.id);
            return (
              <Flex align="center" key={product.item.id}>
                <Image
                  src={producto.image}
                  boxSize="90px"
                  objectFit="cover"
                  borderRadius="5px"
                  alt={producto.title}
                  title={producto.title}
                />
                <Box ml="10px">
                  <NavLink
                    to={`/producto/${producto.category}/${product.item.id}`}
                  >
                    <Text fontWeight="bold" fontSize="xs">
                      {producto.title}
                    </Text>
                  </NavLink>
                  <Text>
                    {formatter.format(product.price)} x {product.amount}
                  </Text>
                </Box>

                <IconButton
                  m="2"
                  variant="outline"
                  icon={<DeleteIcon />}
                  onClick={() => removeFromCart(product.item.id)}
                  title="Eliminar producto"
                />
              </Flex>
            );
          })
        }
        <Divider />
        <Flex justify="space-between">
          <Text>Total {formatter.format(totalDinero)}</Text>
        </Flex>
      </Stack>
      <Divider />

      <form onSubmit={handleSubmit}>
        <FormControl mt="10">
          <FormLabel htmlFor="title">
            Completar los siguientes datos para finalizar la compra
          </FormLabel>

          <Input
            m="2"
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            width={"47%"}
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
          />
          <Input
            m="2"
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            width={"47%"}
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
          />
          <InputGroup m="2">
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input
              type="tel"
              placeholder="Teléfono"
              width={"96.5%"}
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
            />
          </InputGroup>
          <Input
            m="2"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            width={"96.5%"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            errorBorderColor="red.300"
            isInvalid={isInvalid}
          />
          <Input
            m="2"
            type="text"
            id="emailVerificacion"
            name="emailVerificacion"
            onChange={handleMailVerification}
            placeholder="Repetir Email"
            width={"96.5%"}
            errorBorderColor="red.300"
            isInvalid={isInvalid}
          />

          <Button
            type="submit"
            mt="2"
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            width={"99%"}
            isDisabled={isInvalid}
          >
            Enviar
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CheckOut;
