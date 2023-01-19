import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar({ CartWidget }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const DesktopNav = () => {
    return (
      <nav>
        <NavLink className={styles.enlaces} to="/">
          Inicio
        </NavLink>
        <NavLink className={styles.enlaces} to="/mujer">
          Mujer
        </NavLink>
        <NavLink className={styles.enlaces} to="/hombre">
          Hombre
        </NavLink>
        <NavLink className={styles.enlaces} to="/accesorios">
          Accesorios
        </NavLink>
        <NavLink className={styles.enlaces} to="/electronica">
          Electrónica
        </NavLink>
      </nav>
    );
  };

  return (
    <>
      <Box bg={useColorModeValue("blue.700", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex align="center" mr={5}>
            <NavLink to="/">
              <Heading as="h1" size="lg">
                {colorMode === "light" ? (
                  <Image
                    maxH={55}
                    src="../../src/assets/chopin.png"
                    alt="CHOPIN"
                    title="CHOPIN"
                  />
                ) : (
                  <Image
                    maxH={55}
                    src="../../src/assets/chopin_w.png"
                    alt="CHOPIN"
                    title="CHOPIN"
                  />
                )}
              </Heading>
            </NavLink>
          </Flex>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <CartWidget />

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/gaston.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/gaston.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Hola Gastón!</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Mis compras</MenuItem>
                  <MenuItem>Configuración</MenuItem>
                  <MenuItem>Salir</MenuItem>
                </MenuList>
              </Menu>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
