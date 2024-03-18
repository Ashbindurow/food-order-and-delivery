// import Navbar from "../components/Navbar";
import { useState } from "react";
import CarousalSlider from "../components/Carousal_swipe";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <div className="home-div" style={{ backgroundColor: "#f3ff4d" }}>
        {/* <Modal /> */}
        <motion.h1
          key="heading"
          initial={{ rotate: 3 }} // Initial position and opacity
          animate={{ rotate: -3 }} // Animation when component mounts
          exit={{ rotate: 0 }} // Animation when component unmounts
          transition={{ type: "spring", stiffness: 150 }} // Spring animation
          // transition={{ yoyo: Infinity, duration: 1.7, ease: "easeInOut" }}
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
      </div>
    </>
  );
};

export default HomePage;
