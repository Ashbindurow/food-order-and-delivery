import Navbar from "../components/Navbar";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Text,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "../../../utils/axios.js";
import { useEffect, useState } from "react";

const Items = () => {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const response = await axios.get(`/menuitem`);
    console.log(response.data);
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = itemId => {
    console.log(`menuItem id : ${id}`);
  };

  return (
    <div className="items-page">
      <Navbar />
      <Box>
        <Card>
          <CardHeader>
            <Heading size="md">Menu Items</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {items.map(item => (
                <Flex
                  key={item._id}
                  justifyContent="space-between"
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      {item.itemName}
                    </Heading>

                    <Text pt="2" fontSize="sm">
                      {item.price}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      pt="2"
                      fontSize="sm"
                      color={item.availability ? "green" : "red"}
                    >
                      {item.availability ? "Available" : "Not Available"}
                    </Text>
                    <EditIcon
                      boxSize={4}
                      color="blue.500"
                      cursor="pointer"
                      onClick={() => handleEdit(item._id)}
                    />
                  </Box>
                </Flex>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </div>
  );
};

export default Items;
