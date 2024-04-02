import React from "react";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import axios from "../../../utils/axios.js";

const Orders = () => {
  const fetchAllOrders = async () => {
    const response = await axios.get(`/order`);
    console.log(response.data);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <Box>
        <Text>Orders page</Text>
      </Box>
    </div>
  );
};

export default Orders;
