import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/authContext.jsx";
import axios from "../utils/axios.js";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import CartPageTotalAmount from "../components/CartPageTotal";

const CartsPage = () => {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("id");

  const [quantity, setQuantity] = useState(1); // Initial quantity
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price state

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/carts/${userId}`);
      console.log(response.data);
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
      console.log("Total Price =" + totalPrice);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered");
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (itemId, change) => {
    try {
      const updatedCartItems = cartItems.map(item => {
        if (item.menuItem._id === itemId) {
          // Adjust quantity based on the provided change (+1 or -1)
          const newQuantity = Math.max(1, item.quantity + change); // Ensure quantity doesn't go below 1
          const newSubtotal = newQuantity * item.menuItem.price;
          return { ...item, quantity: newQuantity, subtotal: newSubtotal };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      await axios.put(`/carts/${userId}/${itemId}`, {
        quantity: updatedCartItems.find(item => item.menuItem._id === itemId)
          .quantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error.message);
    }
  };

  const handleCartItemDelete = async itemId => {
    try {
      await axios.delete(`/carts/${userId}/${itemId}`);
      fetchCartItems();
    } catch (error) {
      console.log("Error deleting cart item:", error.message);
    }
  };

  return (
    <div
      className="carts_page"
      style={{ backgroundColor: "#f3ff4d", height: "100vh" }}
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        color="blue.500"
        textTransform="capitalize"
        letterSpacing="wide"
        align="center"
        _hover={{ color: "blue.700", textDecoration: "none" }}
      >
        Your Cart
      </Text>
      {isLoggedIn && cartItems.length > 0 ? (
        <Stack align="center">
          {cartItems.map(item => (
            <Box width={{ base: "100%", md: "80%" }} key={item.menuItem._id}>
              <Card
                key={item.menuItem._id}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                zIndex="0"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={item.menuItem.image}
                  alt={item.menuItem.itemName}
                />
                <Stack>
                  <CardBody>
                    <Heading size="md">{item.menuItem.itemName}</Heading>
                    <Text colorScheme="green.500">
                      Rs.{" "}
                      {item.subtotal
                        ? item.subtotal.toFixed(2)
                        : item.menuItem.price}
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Box display="flex" alignItems="center">
                      <ButtonGroup>
                        <Button
                          colorScheme="green"
                          onClick={() =>
                            handleQuantityChange(item.menuItem._id, -1)
                          } // Decrease quantity by 1
                        >
                          -
                        </Button>
                        <Input
                          focusBorderColor="green.600"
                          borderColor="green.400"
                          min="1"
                          max="50"
                          type="number"
                          value={item.quantity}
                          onChange={e => {
                            // const newQuantity = parseInt(e.target.value) || 1;
                            setQuantity(parseInt(e.target.value)); // Update quantity state
                            handleQuantityChange(
                              item.menuItem._id,
                              e.target.value
                            );
                          }}
                        />
                        <Button
                          colorScheme="green"
                          onClick={() =>
                            handleQuantityChange(item.menuItem._id, 1)
                          } // Increase quantity by 1
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                    <Box
                      position="absolute"
                      top="0"
                      right="0"
                      padding="2"
                      zIndex="0"
                    >
                      <Button
                        // leftIcon={<DeleteIcon />}
                        colorScheme="red"
                        variant="solid"
                        onClick={() => handleCartItemDelete(item.menuItem._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </CardFooter>
                </Stack>
              </Card>
            </Box>
          ))}
          <CartPageTotalAmount totalPrice={totalPrice} />
        </Stack>
      ) : (
        <Text align="center">Your cart is empty</Text>
      )}
    </div>
  );
};

export default CartsPage;
