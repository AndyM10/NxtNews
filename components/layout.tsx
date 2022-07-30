import { Box, Container } from "@chakra-ui/react";
import React from "react"
import Navbar from "./Navbar";

type MainLayouProps = {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<MainLayouProps> = ({ children }) => {
  return(
    <Box as='main'>
      <Navbar/>
      <Container maxW='100%'>{children}</Container>
    </Box>
  )
}

export default Layout;
