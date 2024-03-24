import { useState, useEffect } from "react";
import CarousalSlider from "../components/Carousal_swipe";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../utils/axios.js";

import Cards from "../components/Cards";
import { Stack } from "@chakra-ui/react";

const HomePage = () => {
  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/menuitem");
      setMenuItems(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="home-div" style={{ backgroundColor: "#f3ff4d" }}>
      <motion.h1
        key="heading"
        initial={{ rotate: 3 }} // Initial position and opacity
        animate={{ rotate: -3 }} // Animation when component mounts
        exit={{ rotate: 0 }} // Animation when component unmounts
        transition={{ type: "spring", stiffness: 150 }} // Spring animation
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

      <CarousalSlider />
      <div
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
      </div>
    </div>
  );
};

export default HomePage;
