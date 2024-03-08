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
} from "@ant-design/icons";
import { Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import "./Navbar.css";

const Navbar = () => {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCheck = () => {
    setDark(!dark);
  };

  return (
    <nav className="navbar">
      <div className="logo-div">
        <img src="dfd-logo.png" alt="brand-logo" className="logo" />
      </div>
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
            <PhoneOutlined /> Contact
          </NavLink>
        </li>
      </ul>

      <ButtonGroup ml={3} gap={2} className="button-group">
        <Button variant="outline" colorScheme="yellow">
          Create Account
        </Button>

        <Button variant="ghost" colorScheme="yellow">
          Log In
        </Button>
      </ButtonGroup>
      {dark ? (
        <SunFilled onClick={toggleCheck} className="darkmode" />
      ) : (
        <MoonFilled onClick={toggleCheck} className="darkmode" />
      )}
    </nav>
  );
};

export default Navbar;
