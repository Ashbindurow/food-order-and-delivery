import { Box, Button, Input, Select, Stack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";

const CartPageTotalAmount = ({ totalPrice }) => {
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

          <label>Add Address</label>
          <Input />

          <Button colorScheme="blue">Pay Now</Button>
        </Box>
      </Stack>
    </div>
  );
};

export default CartPageTotalAmount;
