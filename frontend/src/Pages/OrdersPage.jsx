import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "../utils/axios.js";
import { useAuth } from "../utils/authContext.jsx";
import { motion } from "framer-motion";

const OrdersPage = () => {
  const userId = localStorage.getItem("id");
  const { isLoggedIn } = useAuth();

  const [orders, setOrders] = useState([]);

  const getOrderStatusChange = status => {
    switch (status) {
      case "pending":
        return "Thank you! We have received your order.";
      case "confirmed":
        return "Your food is being prepared.";
      case "out for delivery":
        return "Your order is out for delivery.";
      case "delivered":
        return "Your order has been delivered.";
      default:
        return "";
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/order/user/${userId}`);
      setOrders(response.data.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, []);

  return (
    <div
      className="home-div"
      style={{
        backgroundColor: "#f3ff4d",
        height: orders.length > 0 ? "100vh" : "100%",
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
        Your Orders
      </Text>
      {isLoggedIn && orders.length > 0 ? (
        <Stack>
          {orders.map(item => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Flex
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
                key={item._id}
              >
                <Card p={10} mt={5}>
                  <CardHeader>
                    <Text>Order ID : {item._id}</Text>
                  </CardHeader>
                  <CardBody>
                    <Text color="green.400">
                      {" "}
                      {getOrderStatusChange(item.status)}{" "}
                    </Text>
                    <Text>Status of the order : {item.status}</Text>

                    <Text>Total Amount: {item.total}/-</Text>
                  </CardBody>
                  <CardFooter>
                    <List spacing={3}>
                      {item.items.map(menuItem => (
                        <ListItem key={menuItem._id} color="yellow.700">
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          {menuItem.menuItem.itemName}
                        </ListItem>
                      ))}
                    </List>
                  </CardFooter>
                </Card>
              </Flex>
            </motion.div>
          ))}
        </Stack>
      ) : (
        <Text align="center">Please Login to view your Orders</Text>
      )}
    </div>
  );
};

export default OrdersPage;
