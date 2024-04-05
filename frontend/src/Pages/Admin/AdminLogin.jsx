import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Box,
  FormControl,
  Stack,
  Button,
  FormLabel,
  FormHelperText,
  VStack,
  HStack,
  Container,
  InputRightElement,
  InputGroup,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { saveCreds } from "../../utils/index.js";
import { useAuth } from "../../utils/authContext.jsx";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/admin/login`, data);
      console.log("Response: ", response);
      saveCreds(response.data.token);
      navigate("/admin-order");
      login();
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      console.error("error:", error);
      setError("There was an error processing your request");
    }
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
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              isRequired
              backgroundColor={"white"}
              color={"black"}
              onChange={e => handleInputChange(e.target.value, "email")}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                isRequired
                backgroundColor={"white"}
                color={"black"}
                type={show ? "text" : "password"}
                onChange={e => handleInputChange(e.target.value, "password")}
              />
              <InputRightElement>
                {show ? (
                  <ViewOffIcon onClick={() => setShow(!show)} />
                ) : (
                  <ViewIcon onClick={() => setShow(!show)} />
                )}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <HStack>
            <Button colorScheme="messenger" onClick={handleSubmit}>
              Log In
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => navigate("/admin-signup")}
            >
              SIGN UP
            </Button>
          </HStack>
        </VStack>
      </Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default AdminLogin;
