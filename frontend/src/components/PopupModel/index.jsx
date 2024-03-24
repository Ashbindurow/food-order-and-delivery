import { CloseIcon } from "@chakra-ui/icons";
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
  Toast,
} from "@chakra-ui/react";
import axios from "../../utils/axios.js";
import { useState, useEffect } from "react";
import { saveCreds } from "../../utils/index.js";
import { useAuth } from "../../utils/authContext.jsx";
import { ToastContainer, toast } from "react-toastify";

const ModalPopup = ({ isOpen, onClose }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const [userData, setUserData] = useState([]);

  const { login } = useAuth(); // Access login function from authentication context

  const onInputChange = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/user/login", data);
      saveCreds(response.data.token);
      login(); // Update authentication state upon successful login
      onClose(); // Close the login modal
      localStorage.setItem("isLoggedIn", "true");
    } catch (e) {
      console.error(e.response.data.message);
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
                <FormLabel>Enter Your Email</FormLabel>
                <Input
                  type="email"
                  onChange={e => onInputChange(e.target.value, "email")}
                />
                <FormLabel>Enter Your Password</FormLabel>
                <Input
                  type="password"
                  onChange={e => onInputChange(e.target.value, "password")}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleLogin}>
                Login
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default ModalPopup;
