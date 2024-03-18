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

const ModalPopupSignIn = ({ isOpen, onClose }) => {
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
                <Input type="text" />
                <FormLabel>Enter Your Email</FormLabel>
                <Input type="email" />
                <FormLabel>Enter Your Password</FormLabel>
                <Input type="password" />
                <FormLabel>Enter Your Mobile Number</FormLabel>
                <Input type="tel" />
                <FormLabel>Upload Your Profile Image</FormLabel>
                <Input type="file" />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal">Login</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default ModalPopupSignIn;
