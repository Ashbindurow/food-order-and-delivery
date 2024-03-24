import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/authContext.jsx";
import axios from "../utils/axios.js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

const CartsPage = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("id");

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/carts/${userId}`);
      console.log(response.data[0].items);
      setCartItems(response.data[0].items);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.put(`/carts/${userId}/${itemId}`, { quantity: newQuantity });
      const updatedCartItems = cartItems.map(item => {
        if (item.menuItem._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div
      className="carts_page"
      style={{ backgroundColor: "#f3ff4d", height: "100vh" }}
    >
      <Text>Your Cart</Text>
      {isLoggedIn && cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <Card
              key={item.menuItem._id}
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
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
                </CardBody>
                <CardFooter>
                  <Input
                    focusBorderColor="green.600"
                    borderColor="green.400"
                    min="1"
                    max="50"
                    type="number"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(item.menuItem._id, e.target.value)
                    }
                  />
                </CardFooter>
              </Stack>
            </Card>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartsPage;

{
  /* <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
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

                  <Text py="2">
                    Caffè latte is a coffee beverage of Italian origin made with
                    espresso and steamed milk.
                  </Text>
                </CardBody>

                <CardFooter>
                  <Button variant="solid" colorScheme="blue">
                    Quantity:{item.quantity}
                  </Button>
                </CardFooter>
              </Stack>
            </Card> */
}
