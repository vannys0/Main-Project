import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { AiOutlineHome, AiOutlineContacts } from "react-icons/ai";
import { GiRabbit } from "react-icons/gi";
import { FcAbout } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "./DropdownMenu.jsx";

function Navbar() {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  return (
    <nav>
      <Link to="/home" className="title">
        <h2 className="brand">e-Leporidae</h2>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home">
            {/* <AiOutlineHome className="icons" style={{}} /> */}
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/adopt">
            {/* <GiRabbit className="icons" /> */}
            Adopt
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            {/* <AiOutlineContacts className="icons" /> */}
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            {/* <FcAbout className="icons" style={{ color: "#fff" }} /> */}
            About
          </NavLink>
        </li>
        <div onClick={() => setDropdown((prev) => !prev)}>
          <MdAccountCircle className="profile" />
        </div>

        {dropdown && <DropdownMenu />}

        {/* <Dropdown show={open} onToggle={handleToggle}>
          <Dropdown.Toggle
            style={{
              backgroundColor: "#00828c",
              color: "#fff",
              outline: "none",
              border: "none",
              fontSize: "18px",
              fontWeight: "600",
            }}
            className="myAccount-btn"
            id="basic-button"
          >
            Me
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              width: "100px",
            }}
          >
            <Dropdown.Item onClick={handleToggle}>My application</Dropdown.Item>
            <Dropdown.Item onClick={handleToggle}>Mapping</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleToggle}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </ul>
    </nav>
  );
}

export default Navbar;
