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
import Navbar from "../components/Navbar";
import axios from "../../../utils/axios.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`/order`);
    console.log(response.data);
    setOrders(response.data);
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
    <div>
      <Navbar />
      <Box>
        <Heading>Orders page</Heading>
        {orders.map(order => (
          <Container key={order._id}>
            <Card>
              <CardHeader>
                <Text>
                  order id: <Text color="blue.600">{order._id}</Text>
                </Text>
              </CardHeader>
              <CardBody>
                <Text>
                  Shipping Address :
                  <Text color="blue.600">{order.shippingAddress}</Text>
                </Text>
                <Text>Order status: {order.status}</Text>
                <Text textAlign="center" fontSize="md">
                  ITEMS ORDERED
                </Text>
                <Stack divider={<StackDivider />} spacing="4">
                  {order.items.map(item => (
                    <Flex justifyContent="space-between" alignItems="center">
                      <Box>
                        <Text color="yellow.500">{item.menuItem.itemName}</Text>
                        <Text>Quantity: {item.quantity}</Text>
                      </Box>
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
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </Container>
        ))}
      </Box>
    </div>
  );
};

export default Orders;
