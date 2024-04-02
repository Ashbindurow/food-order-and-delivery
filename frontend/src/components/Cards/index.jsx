import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Image,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "../../utils/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cards = ({ menuItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const navigate = useNavigate();

  const handleAddToCart = async menuItemId => {
    try {
      const response = await axios.post("/carts", {
        userId: localStorage.getItem("id"), // Replace with the actual user ID
        menuItemId: menuItemId, // Assuming item._id is the unique identifier for the item
        quantity: 1, // You can adjust the quantity as needed
      });
      console.log("Item added to cart:", response.data);

      const updatedCarts = response.data.cartItems;
      setIsAddedToCart(true);
      if (!isAddedToCart) {
        navigate("/carts");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={menuItem.image}
            alt="item image"
            w="100%"
            h="200px"
            objectFit="cover"
            cursor="pointer"
            onClick={onOpen}
            transition="0.3s"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Stack mt="2" spacing="2">
            <Heading size="md">{menuItem.itemName}</Heading>
            <Text noOfLines={2}>{menuItem.description}</Text>
            <Text color="green.600" fontWeight="7" fontSize="2xl">
              Rs.{menuItem.price}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup
            spacing="2"
            justifyContent="center"
            marginLeft="auto"
            marginRight="auto"
          >
            <Button
              variant="solid"
              colorScheme="pink"
              border="2px"
              onClick={() => handleAddToCart(menuItem._id)}
            >
              Place Order
            </Button>
            <Button
              variant="outline"
              colorScheme="pink"
              onClick={() => handleAddToCart(menuItem._id)}
              isDisabled={isAddedToCart}
            >
              {isAddedToCart ? "Added to cart" : "Add to cart"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default Cards;
