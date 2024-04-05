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

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/carts/${userId}`);
      console.log(response.data.items);
      setCartItems(response.data.items);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [isLoggedIn]);

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      await axios.put(`/carts/${userId}/${itemId}`, { quantity });
      fetchCartItems();
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
  // Calculate totalPrice
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.subtotal;
  }, 0);

  return (
    <div
      className="carts_page"
      style={{
        backgroundColor: "#f3ff4d",
        height: cartItems.length > 0 ? "100%" : "100vh",
        paddingBottom: "20px",
      }}
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
                    <Text>{item.menuItem.description}</Text>
                    <Text colorScheme="green.500" mt={2}>
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
                            handleQuantityChange(
                              item.menuItem._id,
                              item.quantity - 1
                            )
                          } // Decrease quantity by 1
                          disabled={item.quantity <= 1}
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
                          onChange={e =>
                            handleQuantityChange(
                              item.menuItem._id,
                              Math.max(1, parseInt(e.target.value))
                            )
                          }
                        />
                        <Button
                          colorScheme="green"
                          onClick={() =>
                            handleQuantityChange(
                              item.menuItem._id,
                              item.quantity + 1
                            )
                          } // Increase quantity by 1
                          disabled={item.quantity >= 50}
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
          <CartPageTotalAmount
            cartItems={cartItems}
            setCartItems={setCartItems}
            userId={userId}
            totalPrice={totalPrice}
          />
        </Stack>
      ) : (
        <Text align="center">Your cart is empty</Text>
      )}
    </div>
  );
};

export default CartsPage;
