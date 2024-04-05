import React from "react";
import axios from "../../utils/axios.js";
import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  VStack,
  Container,
  Box,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AlertIcon } from "@chakra-ui/icons";
const AdminSignUp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState(false);

  const handleSubmit = async () => {
    await axios.post(`/admin/signup`, data);
    setAlert(!alert);
    setTimeout(() => {
      navigate("/admin-login");
    }, 2000);
  };
  const handleInputChange = (value, key) => {
    setData({ ...data, [key]: value });
  };

  return (
    <Container>
      <Box
        m="40px 0 15px 0"
        borderWidth="3px"
        borderRadius="lg"
        borderColor="blue.600"
        p="20px"
        color={"black"}
      >
        <VStack spacing="5px" color="black">
          <FormControl>
            <FormLabel>Enter your Name</FormLabel>
            <Input
              isRequired
              backgroundColor={"white"}
              color={"black"}
              type="text"
              onChange={e => handleInputChange(e.target.value, "name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Enter the Email address</FormLabel>
            <Input
              isRequired
              backgroundColor={"white"}
              color={"black"}
              type="email"
              onChange={e => handleInputChange(e.target.value, "email")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Set Password</FormLabel>
            <Input
              isRequired
              backgroundColor={"white"}
              color={"black"}
              type="password"
              onChange={e => handleInputChange(e.target.value, "password")}
            />
          </FormControl>

          <Button variant="outline" colorScheme="yellow" onClick={handleSubmit}>
            Submit
          </Button>
        </VStack>
      </Box>
      {alert ? (
        <Alert status="success">
          <AlertIcon />
          Signup Successful !!!
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
};

export default AdminSignUp;
