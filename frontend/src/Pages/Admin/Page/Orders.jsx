import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Select,
  StackDivider,
  Text,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/index.jsx";
import axios from "../../../utils/axios.js";
import { useAuth } from "../../../utils/authContext.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn } = useAuth();

  const fetchAllOrders = async () => {
    const response = await axios.get(`/order`);
    console.log(response.data);
    setOrders(response.data.reverse());
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/order/${orderId}`, {
        status: newStatus,
      });
      setOrders(prevOrders =>
        prevOrders.map(order => (order._id === orderId ? response.data : order))
      );
    } catch (error) {
      console.error("error in status onChange", error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <Box bg="blue.200">
          <Heading>Orders</Heading>
          {orders.map(order => (
            <Card
              key={order._id}
              borderWidth="1px" // Set border width
              borderColor="gray.200" // Set border color
              borderRadius="md" // Set border radius for a rounded border
              p="4" // Set padding'
              mb={4}
            >
              <CardBody>
                <Text>
                  order id: <span style={{ color: "blue" }}>{order._id}</span>
                </Text>

                <Text>
                  Shipping Address :
                  <span style={{ color: "blue" }}>{order.shippingAddress}</span>
                </Text>
                <Text>
                  Order status:
                  <span style={{ color: "blue" }}>{order.status}</span>
                </Text>
                <Text textAlign="center" fontSize="md">
                  ITEMS ORDERED
                </Text>
                <Stack divider={<StackDivider />} spacing="4">
                  <Flex justifyContent="space-evenly" alignItems="center">
                    {order.items.map(item => (
                      <Box key={item._id}>
                        <Text color="yellow.500">{item.menuItem.itemName}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </Box>
                    ))}
                    <Box>
                      <Select
                        size="sm"
                        value={order.status}
                        onChange={e =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="out for delivery">
                          Out for Delivery
                        </option>
                        <option value="delivered">Delivered</option>
                      </Select>
                    </Box>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Box>
      </div>
    </>
  );
};

export default Orders;
