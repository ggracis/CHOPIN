import React, { useContext, useState } from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { cartContext, productosContext } from "../../App";
import { db } from "../../../db/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Purchases = () => {
  const productos = useContext(productosContext);
  const { userId } = useContext(cartContext) || {};

  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const getPurchases = async () => {
    const q = query(collection(db, "carts2"), where("user", "==", userId));
    const userQuerySnapshot = await getDocs(q);
    if (!userQuerySnapshot.empty) {
      console.log("userQuerySnapshot", userQuerySnapshot);
    }
  };

  return (
    <Box maxW="700px" mx="auto" mt="7em">
      <Stack spacing="10px">
        <Button>PROXIMAMENTE...</Button>
      </Stack>
    </Box>
  );
};

export default Purchases;
