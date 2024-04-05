import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios.js";

const ModalPopupSignIn = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/user/signup`, userData);

      onClose(); // Close the login modal
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      navigate("/");
    } catch (error) {
      console.error("error in signing up", error);
    }
  };
  return (
    <div className="modal-div">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Enter Your Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                />
                <FormLabel>Enter Your Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
                <FormLabel>Enter Your Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
                {/* <FormLabel>Enter Your Mobile Number</FormLabel>
                <Input
                  type="tel"
                  name="mobileNumber"
                  value={userData.mobileNumber}
                  onChange={handleInputChange}
                />
                <FormLabel>Upload Your Profile Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                /> */}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Sign In
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      {/* Alert displayed after successful signup */}
      {alert && (
        <Alert status="success">
          <AlertIcon />
          Signup Successful! Please login.
        </Alert>
      )}
    </div>
  );
};

export default ModalPopupSignIn;
