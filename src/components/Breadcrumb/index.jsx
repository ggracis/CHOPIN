import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const paths = pathname.split("/");
    let newBreadcrumb = [];

    if (paths.length === 2) {
      newBreadcrumb = ["Inicio"];
    } else if (paths.length === 3) {
      newBreadcrumb = ["Inicio", paths[2]];
    } else if (paths.length === 4) {
      newBreadcrumb = ["Inicio", paths[2], paths[3]];
    }
    setBreadcrumb(newBreadcrumb);
  }, [location]);

  return (
    <Box>
      {breadcrumb.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </Box>
  );
};

export default Breadcrumb;
