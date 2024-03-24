import {
  HomeOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  BarsOutlined,
  MoonFilled,
  SearchOutlined,
  SunOutlined,
  SunFilled,
  BookOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import {
  Button,
  ButtonGroup,
  MenuButton,
  useDisclosure,
  Menu,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import ModalPopup from "../PopupModel";
import ModalPopupSignIn from "../PopupModal_SignIn";
import { useState, useEffect } from "react";
import axios from "../../utils/axios.js";
import { useAuth } from "../../utils/authContext.jsx";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState([]);

  const { isLoggedIn, login, logout } = useAuth();

  const navigate = useNavigate();

  const {
    isOpen: isLogInOpen,
    onClose: onCloseLogIn,
    onOpen: onOpenLogIn,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpLogIn,
    onOpen: onOpenSignUp,
  } = useDisclosure();

  const handleLogin = async () => {
    login(); // Update authentication state upon successful login
    onCloseLogIn(); //closes the login model
  };
  const handleLogout = async () => {
    logout();
  };

  const fetchUserData = async () => {
    const response = await axios.get(`/user/${localStorage.getItem("id")}`);
    // console.log(response.data);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <ModalPopup
        isOpen={isLogInOpen}
        onClose={onCloseLogIn}
        onLogin={handleLogin}
      />
      <ModalPopupSignIn isOpen={isSignUpOpen} onClose={onSignUpLogIn} />

      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="navbar"
      >
        <motion.div whileHover={{ scale: 1.1 }} className="logo-div">
          <img
            src="logo-food-app.png"
            alt="brand-logo"
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
        </motion.div>
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <SearchOutlined style={{ color: "black", cursor: "pointer" }} />
        </div>
        <div className="menu-bar">
          <HamburgerIcon
            cursor="pointer"
            w={8}
            h={10}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <Link to={"/"}>
              <HomeOutlined />
              Home
            </Link>
          </li>
          <li>
            <NavLink to={"/orders"}>
              <BookOutlined />
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={"/carts"}>
              <ShoppingCartOutlined />
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>
              {/* <PhoneOutlined /> Contact */}
              <EnvironmentOutlined /> Track Order
            </NavLink>
          </li>
        </ul>

        {isLoggedIn ? (
          <Menu className="profile_drop_down">
            <MenuButton>
              <Avatar src={userData.picture} />
            </MenuButton>
            <MenuList color="black">
              <MenuItem>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup ml={3} gap={2} className="button-group">
            <Button
              variant="outline"
              colorScheme="yellow"
              onClick={onOpenSignUp}
            >
              Create Account
            </Button>
            <Button variant="ghost" colorScheme="yellow" onClick={onOpenLogIn}>
              Log In
            </Button>
          </ButtonGroup>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;
