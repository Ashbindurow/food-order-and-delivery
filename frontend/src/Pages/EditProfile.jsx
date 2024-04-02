import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Form, Input, Button, message } from "antd";
import ImageUploader from "../components/ImageUploader";
import axios from "../utils/axios";

const EditProfile = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    picture: "",
    address: [],
  });

  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.put(`/user/profile/${userId}`);
      console.log(response);
      setUserData(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await axios.put(`/user/profile/${userId}`, {
        picture: userData.picture,
        address: userData.address,
      });
      setLoading(false);
      message.success("Profile updated successfully");
      navigate(`/user-profile`);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Failed to update profile. Please try again later.");
    }
  };
  // Guard clause to handle userData.address being undefined
  if (!userData || !userData.address) {
    return null; // or display a loading indicator
  }

  const handleAddressChange = (value, index, field) => {
    const newAddress = [...userData.address];
    newAddress[index][field] = value;
    setUserData({ ...userData, address: newAddress });
  };
  const handleAddAddress = () => {
    setUserData({
      ...userData,
      address: [
        ...userData.address,
        {
          house: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          mobileNumber: "",
        },
      ],
    });
  };
  const handleRemoveAddress = index => {
    const newAddresses = [...userData.address];
    newAddresses.splice(index, 1);
    setUserData({ ...userData, address: newAddresses });
  };

  return (
    <div
      className="user-profile"
      style={{
        marginLeft: "30px",
        width: "500px",
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Username">{userData.username}</Form.Item>
        <Form.Item label="Email">{userData.email}</Form.Item>
        <Form.Item label="Addresses">
          {userData.address.map((address, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <Input
                value={address.house}
                onChange={e =>
                  handleAddressChange(e.target.value, index, "house")
                }
                placeholder="House/Flat Name"
                style={{ marginBottom: "8px" }}
              />
              <Input
                value={address.street}
                onChange={e =>
                  handleAddressChange(e.target.value, index, "street")
                }
                placeholder="Street"
                style={{ marginBottom: "8px" }}
              />
              <Input
                value={address.city}
                onChange={e =>
                  handleAddressChange(e.target.value, index, "city")
                }
                placeholder="City"
                style={{ marginBottom: "8px" }}
              />
              <Input
                value={address.state}
                onChange={e =>
                  handleAddressChange(e.target.value, index, "state")
                }
                placeholder="State"
                style={{ marginBottom: "8px" }}
              />
              <Input
                value={address.zipCode}
                onChange={e =>
                  handleAddressChange(e.target.value, index, "zipCode")
                }
                placeholder="Zip Code"
                style={{ marginBottom: "8px" }}
              />
              <Input
                value={address.mobileNumber}
                onChange={e =>
                  handleAddressChange(e.target.value, index, "mobileNumber")
                }
                placeholder="Mobile Number"
                style={{ marginBottom: "8px" }}
              />
              <Button onClick={() => handleRemoveAddress(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={handleAddAddress}>Add Address</Button>
        </Form.Item>
        <Form.Item label="Profile Picture">
          <ImageUploader
            imageUrl={userData.picture}
            onChange={url => setUserData({ ...userData, picture: url })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
