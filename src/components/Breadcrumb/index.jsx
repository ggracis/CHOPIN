import { ChevronRightIcon } from "@chakra-ui/icons";
import { BreadcrumbItem, BreadcrumbLink, Breadcrumb } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { productosContext } from "../../App";

const BreadcrumbComp = () => {
  const [breadcrumb, setBreadcrumbComp] = useState([]);

  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const idProducto = paths.pop();

  const productos = useContext(productosContext);
  const producto = productos.find((producto) => producto.id == idProducto);
  const nombreProducto = producto ? producto.title : "Producto no encontrado";
  const categoria = paths[2];

  useEffect(() => {
    const newBreadcrumb = [
      { name: "Inicio", href: "/" },
      { name: categoria, href: `/${categoria}` },
      { name: nombreProducto, href: `/producto/${categoria}/${idProducto}` },
    ];
    setBreadcrumbComp(newBreadcrumb);
  }, [pathname]);

  return (
    <Breadcrumb
      ml={25}
      p={5}
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {breadcrumb.map((item, index) => (
        <BreadcrumbItem key={index}>
          <BreadcrumbLink>
            <NavLink to={item.href}>{item.name}</NavLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComp;
