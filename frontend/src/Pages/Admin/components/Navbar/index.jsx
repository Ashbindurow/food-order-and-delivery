import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { useAuth } from "../../../../utils/authContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <>
      <Box bg="black" color="white" p={4} textTransform={"uppercase"}>
        <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
          <Image src="logo-food-app.png" w="50px" />
          <NavLink to={"/admin-order"}>
            <Text>Orders</Text>
          </NavLink>
          <NavLink to={"/admin-items"}>
            <Text>Items</Text>
          </NavLink>
          <NavLink to={"/admin-customers"}>
            <Text>customers</Text>
          </NavLink>
          <Button onClick={handleLogout}>Log out</Button>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
