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
  WrapItem,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useContext } from "react";
import { cartContext } from "../../App";

export default function NavBar({ CartWidget }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const DesktopNav = () => {
    return (
      <nav>
        <NavLink className={styles.enlaces} to="/">
          Inicio
        </NavLink>
        <NavLink className={styles.enlaces} to="/herramientas">
          Herramientas
        </NavLink>
        <NavLink className={styles.enlaces} to="/deportes">
          Deportes y fitness
        </NavLink>
        <NavLink className={styles.enlaces} to="/moda">
          Moda
        </NavLink>
        <NavLink className={styles.enlaces} to="/salud">
          Salud y belleza
        </NavLink>
      </nav>
    );
  };
  const { userNombre, userApellido } = useContext(cartContext);

  return (
    <Box
      bg={useColorModeValue("blue.700", "gray.900")}
      px={4}
      position="sticky"
      top={0}
      width="100%"
      zIndex={1}
      pb={2}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex align="center" mr={5}>
          <NavLink to="/">
            <Heading as="h1" size="lg">
              {colorMode === "light" ? (
                <Image
                  maxH={55}
                  src="/chopin.png"
                  alt="CHOPIN"
                  title="CHOPIN"
                />
              ) : (
                <Image
                  maxH={55}
                  src="/chopin_w.png"
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
                  size={"md"}
                  src={`https://avatars.dicebear.com/api/male/${userNombre}${userApellido}.svg`}
                  alt={userNombre}
                  title={userNombre}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <WrapItem>
                    <Avatar
                      size={"2xl"}
                      src={`https://avatars.dicebear.com/api/male/${userNombre}${userApellido}.svg`}
                      alt={userNombre}
                      title={userNombre}
                    />
                  </WrapItem>
                </Center>
                <br />
                <Center>
                  <p>
                    Hola {userNombre} {userApellido}!
                  </p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>
                  <NavLink to="/miscompras">Mis compras</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/admProductos">
                    ❗Administrar productos❗
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Menu>

            <Button onClick={toggleColorMode} size="l" p={5}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
