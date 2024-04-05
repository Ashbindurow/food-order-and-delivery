import React from "react";
import axios from "../../utils/axios.js";
import { useState, useEffect } from "react";
import { FormControl, FormLabel, VStack } from "@chakra-ui/react";

const AdminSignUp = () => {
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    // await axios.post(`/admin/signup`, data);
  };
  const handleInputChange = (value, key) => {
    setData({ ...data, [key]: value });
  };

  return (
    <VStack>
      <form>
        <FormControl>
          <FormLabel>Enter userName</FormLabel>
          <Input
            type="text"
            onChange={e => handleInputChange(e.target.value, "name")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Enter the Email address</FormLabel>
          <Input
            type="email"
            onChange={e => handleInputChange(e.target.value, "email")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Set Password</FormLabel>
          <Input
            type="password"
            onChange={e => handleInputChange(e.target.value, "password")}
          />
        </FormControl>
        <Button onClick={() => handleSubmit()}>Submit</Button>
      </form>
    </VStack>
  );
};

export default AdminSignUp;
