import {
  Button,
  Flex,
  Input,
  Image,
  Container,
  InputGroup,
  InputRightElement,
  FormControl,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
const NavbarBs = () => {
  return (
    <Container display="flex" justify="space-between">
      <Flex
        display="flex"
        align="center"
        justify="space-between"
        padding="1rem"
      >
        {/* Logo */}
        <Image src="dfd-logo.png" alt="logo" w="30px" />

        {/* Search */}
        <FormControl align="center">
          <InputGroup>
            <Input type="text" placeholder="Search" />
            <InputRightElement>
              <SearchIcon cursor="pointer" />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Navigation */}
        <Flex display={"flex"} justify={"space-evenly"}>
          <ul>
            <li>Home</li>
            <li>Your Orders</li>
            <li>Cart</li>
            <li>Contact Us</li>
          </ul>
        </Flex>

        {/* Buttons */}
        <Flex>
          <Button variant="outline" colorScheme="#f3ff4d">
            Create Account
          </Button>
          <Button variant="solid" colorScheme="#f3ff4d" marginLeft="4">
            Login
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default NavbarBs;
