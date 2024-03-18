import { useState } from "react";
import { Text } from "@chakra-ui/react";

const OrdersPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
      className="home-div"
      style={{ backgroundColor: "#f3ff4d", height: "100vh" }}
    >
      {isLoggedIn ? (
        <h1>You are LOgged in</h1>
      ) : (
        <Text align="center">Please Login to view your Orders</Text>
        // <img src="" alt="" />
      )}
    </div>
  );
};

export default OrdersPage;
