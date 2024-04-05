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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios.js";
import { useAuth } from "../../utils/authContext.jsx";
import { saveCreds } from "../../utils";

const ModalPopupSignIn = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const { isLoggedIn, login } = useAuth();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // const handleImageChange = e => {
  //   setUserData({ ...userData, profileImage: e.target.files[0] });
  // };

  const handleSubmit = async () => {
    await axios.post(`/user/signup`, userData);
    saveCreds(response.data.token);
    login(); // Update authentication state upon successful login
    onClose(); // Close the login modal
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
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
    </div>
  );
};

export default ModalPopupSignIn;
