import React from "react";
import axios from "../../utils/axios.js";
import { useState, useEffect } from "react";
import { FormControl, FormLabel, VStack } from "@chakra-ui/react";

const AdminSignUp = () => {
  const [orders, setOrders] = useState([]);

  return (
    <VStack>
      <FormControl>
        <FormLabel> </FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel> </FormLabel>
        <Input />
      </FormControl>
    </VStack>
  );
};

export default AdminSignUp;
