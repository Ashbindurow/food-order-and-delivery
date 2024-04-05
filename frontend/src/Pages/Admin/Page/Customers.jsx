import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../../../utils/axios.js";
import React from "react";

const Customers = () => {
  const [users, setUsers] = useState([]);
  const fetchOurCustomers = async () => {
    const response = await axios.get("/user");
    console.log(response.data);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchOurCustomers();
  }, []);

  return (
    <div>
      <Navbar />
      <Box>
        <Heading>Our Customers</Heading>
        <Text></Text>
        <Flex flexWrap="wrap">
          {users.map(user => (
            <Box
              key={user._id}
              width={{ base: "100%", md: "50%", lg: "33.33%" }}
            >
              <Card
                key={user._id}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="md"
              >
                <CardBody>
                  <Flex justifyContent="space-around">
                    <Box height="100%">
                      <Text>
                        Name :<Text color="blue.600">{user.username}</Text>
                      </Text>
                      <Text>
                        Email :<Text color="blue.600">{user.email}</Text>
                      </Text>
                      <Text>
                        Joined in :
                        <Text color="blue.600">{user.createdAt}</Text>
                      </Text>
                    </Box>
                    <Box height="100px">
                      <Image src={user.picture} height="100%" />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Customers;
