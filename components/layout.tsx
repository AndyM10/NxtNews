import { Box, Container } from "@chakra-ui/react";
import React from "react"
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

type MainLayouProps = {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<MainLayouProps> = ({ children }) => {
  return(
    <Box as='main'>
      <Navbar/>
      <Sidebar/>
      <Container maxW='80%' ml={{base:0 , md:60}}>{children}</Container>
    </Box>
  )
}

export default Layout;
