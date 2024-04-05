import React from "react";
import { Text, Image, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ContactUsPage = () => {
  return (
    <div
      style={{
        backgroundColor: "#f3ff4d",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box maxW="600px" textAlign="center" mb={5}>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
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
              Feast like Earth's Mightiest Heroes at Your Home,Workplace or
              anywhere you want!
            </Text>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Image src="avengers.jpg" objectFit={"cover"} w="100%" />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="green.500"
              textTransform="capitalize"
              letterSpacing="wide"
              align="center"
              _hover={{ color: "blue.700", textDecoration: "none" }}
            >
              "Indulge in superhero-worthy meals delivered straight to your
              doorstep from Hotel 69! Experience the ultimate convenience of
              dining like the Avengers without leaving your home. Order now and
              let our culinary heroes assemble a feast for you
            </Text>
          </motion.div>
        </Box>
      </motion.div>
    </div>
  );
};

export default ContactUsPage;
