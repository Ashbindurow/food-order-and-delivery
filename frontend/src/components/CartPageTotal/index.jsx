import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios.js";
import React from "react";

const CartPageTotalAmount = ({
  totalPrice,
  cartItems,
  userId,
  setCartItems,
}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(`/user/${userId}`);
        setAddresses(response.data.address);
      } catch (e) {
        console.log(e.message);
      }
    };
    //
    fetchUserAddress();
  }, [userId]);

  const handleSelectAddress = address => {
    setSelectedAddress(address);
  };

  const handleOrderNow = async () => {
    try {
      const selectedAddressObject = addresses.find(
        addr => addr.house === selectedAddress
      );
      console.log("Selected Address:", selectedAddressObject);

      // Calculate total price based on cart items
      let totalPrice = 0;
      cartItems.forEach(item => {
        totalPrice += item.subtotal;
      });

      const orderItems = cartItems.map(item => ({
        menuItem: item.menuItem._id,
        quantity: item.quantity,
        totalPrice: item.subtotal,
        // shippingAddress: selectedAddressObject,
      }));

      const orderData = {
        user: userId,
        items: orderItems,
        total: totalPrice,
        shippingAddress: selectedAddressObject
          ? `${selectedAddressObject.house}, ${selectedAddressObject.street}, ${selectedAddressObject.city}, ${selectedAddressObject.state} - ${selectedAddressObject.zipCode}`
          : null,
      };

      await axios.post("/order", orderData);

      console.log("order placed ", orderData);
      setShowAlert(true);

      setTimeout(() => {
        setCartItems([]);

        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Stack align="center">
        <Box
          bgColor="white"
          width={{ base: "100%", md: "80%" }}
          p={4}
          boxShadow="md"
          borderRadius="md"
        >
          <Text>Total Amount : {totalPrice.toFixed(2)}</Text>

          <Text mt={5}>Address</Text>
          <Select
            placeholder="Select Delivery Address"
            value={selectedAddress}
            onChange={e => handleSelectAddress(e.target.value)}
          >
            {addresses.map((address, index) => (
              <option key={index} value={address.house}>
                {address.house}
                {address.street}, {address.city}, {address.state} -{" "}
                {address.zipCode}
              </option>
            ))}
          </Select>
          {/* Show alert on successful order placement */}
          {showAlert && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              <AlertTitle mr={2}>Order Placed!</AlertTitle>
              <AlertDescription>
                Your order has been successfully placed.
              </AlertDescription>
            </Alert>
          )}

          <Button mt={5} colorScheme="blue" onClick={handleOrderNow}>
            Order Now
          </Button>
        </Box>
      </Stack>
    </div>
  );
};

export default CartPageTotalAmount;
