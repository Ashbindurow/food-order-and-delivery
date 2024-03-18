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
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

const ModalPopup = ({ isOpen, onClose }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const onInputChange = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const onLoginClick = () => {
    const response = axios.post("http://localhost:5000/user/login", data);

    console.log("login successful");
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
              <Button colorScheme="teal" onClick={onLoginClick}>
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
