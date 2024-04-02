import React from "react";
import AdminLogin from "../AdminLogin";
import AdminSignUp from "../AdminSignup";
import {
  Container,
  Box,
  TabList,
  Tab,
  TabPanel,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../../utils/authContext";
import Navbar from "../components/Navbar";

const AdminHome = () => {
  const { isLoggedIn, logout } = useAuth();
  if (isLoggedIn) {
    return <AdminLogin />;
  }
  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Box
        d="flex"
        justifyContent="Center"
        w="100%"
        bg={"skyblue"}
        textAlign={"center"}
        // m="40px 0 15px 0"
        borderWidth="3px"
        borderRadius="lg"
        borderColor="gold"
        p="10px 0"
      ></Box>
    </div>
  );
};

export default AdminHome;
