import { useState, useEffect } from "react";
import CarousalSlider from "../components/Carousal_swipe";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/axios.js";

import Cards from "../components/Cards";
import { Stack } from "@chakra-ui/react";
import { useAuth } from "../utils/authContext.jsx";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);

  const { isLoggedIn } = useAuth();

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/menuitem");
      setMenuItems(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMenuItems();
    }
  }, [isLoggedIn]);

  return (
    <div className="home-div" style={{ backgroundColor: "#f3ff4d" }}>
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          padding: "2px 0",
          fontFamily: "DynaPuff",
          fontSize: "2em",
        }}
      >
        Here are our dishes
      </motion.h1>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <CarousalSlider />
      </motion.div>

      {isLoggedIn && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="card-container"
          style={{
            backgroundColor: "#ff674d",
            padding: "30px",
          }}
        >
          <h1
            style={{
              fontWeight: "bolder",
              fontSize: "3rem",
              color: "black",
              textAlign: "center",
            }}
          >
            Try our most Delicious dishes ever...
          </h1>
          <Stack
            className="item_cards_container"
            direction="row"
            spacing="4"
            justifyContent="center"
            alignItems="flex-start"
            flexWrap="wrap"
          >
            {menuItems.map(item => {
              return <Cards key={item._id} menuItem={item} />;
            })}
          </Stack>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
