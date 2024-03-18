import { useState } from "react";
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
import { Button, ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import ModalPopup from "../PopupModel";
import ModalPopupSignIn from "../PopupModal_SignIn";
import "./Navbar.css";

const Navbar = () => {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const toggleCheck = () => {
    setDark(!dark);
  };

  return (
    <>
      <ModalPopup isOpen={isLogInOpen} onClose={onCloseLogIn} />
      <ModalPopupSignIn isOpen={isSignUpOpen} onClose={onSignUpLogIn} />

      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="navbar"
      >
        <motion.div whileHover={{ scale: 1.1 }} className="logo-div">
          <img src="dfd-logo.png" alt="brand-logo" className="logo" />
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

        <ButtonGroup ml={3} gap={2} className="button-group">
          <Button variant="outline" colorScheme="yellow" onClick={onOpenSignUp}>
            Create Account
          </Button>

          <Button variant="ghost" colorScheme="yellow" onClick={onOpenLogIn}>
            Log In
          </Button>
        </ButtonGroup>
        {dark ? (
          <SunFilled onClick={toggleCheck} className="darkmode" />
        ) : (
          <MoonFilled onClick={toggleCheck} className="darkmode" />
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;
