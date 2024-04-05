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
  FormControl,
  Button,
  FormLabel,
  Input,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import axios from "../../../utils/axios.js";
import { useEffect, useState } from "react";

const Items = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [editBtn, seteditBtn] = useState(false);

  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    image: null,
    availability: true,
  });

  const fetchItems = async () => {
    const response = await axios.get(`/menuitem`);
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    console.log(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image);
      const imageResponse = await axios.post("/image", imageFormData);
      const imageUrl = imageResponse.data.url;

      const formDataWithImage = {
        itemName: formData.itemName,
        price: formData.price,
        description: formData.description,
        availability: formData.availability,
        imageUrl: imageUrl,
      };

      await axios.post("/menuitem", { ...formData, image: imageUrl });
      console.log("Submitting the data ", formData);

      setFormData({
        availability: false,
        image: null,
      });
      fetchItems();
    } catch (error) {
      console.error("Error in submitting the form: ", error);
    }
  };
  const handleAvailabilityChange = async (itemId, availability) => {
    try {
      await axios.patch(`/menuitem/${itemId}/availability`, { availability });
      seteditBtn(!editBtn);

      fetchItems();
    } catch (error) {
      console.error("Error updating availability: ", error);
    }
  };

  return (
    <div className="items-page">
      <Navbar />
      <Flex justify="space-between">
        <Box
          width={{ base: "100%", md: "70%", lg: "55%" }}
          mt={4}
          mx="auto"
          p={5}
          border="5px"
          borderColor="yellow.200"
          borderRadius="md"
        >
          <Button
            mx="auto"
            variant="outline"
            colorScheme="purple"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Add Item"}
          </Button>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Item Name</FormLabel>
                <Input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Image Upload</FormLabel>
                <Input type="file" name="image" onChange={handleImageChange} />
              </FormControl>
              <FormControl isRequired>
                <Checkbox
                  name="availability"
                  isChecked={formData.availability}
                  onChange={handleCheckboxChange}
                >
                  Availability
                </Checkbox>
              </FormControl>
              <Button mt={4} colorScheme="blue" type="submit">
                Submit
              </Button>
            </form>
          )}
        </Box>
      </Flex>
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
                      onClick={() => seteditBtn(!editBtn)}
                    />
                    {editBtn ? (
                      <Box>
                        <Select
                          onChange={e =>
                            handleAvailabilityChange(
                              item._id,
                              e.target.value === "true"
                            )
                          }
                          defaultValue={item.availability.toString()}
                        >
                          <option value="true">Available</option>
                          <option value="false">Not Available</option>
                        </Select>
                      </Box>
                    ) : (
                      ""
                    )}
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
