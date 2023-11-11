import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { AiOutlineHome, AiOutlineContacts } from "react-icons/ai";
import { GiRabbit } from "react-icons/gi";
import { FcAbout } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownMenu from "./DropdownMenu.jsx";
import { BsJustify } from "react-icons/bs";
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";

function Navbar() {
  const user = SecureStore.getItem("userToken");
  const navigateTo = useState();
  const authContext = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "You have been logout.", "success");
        SecureStore.removeItem();
        authContext.signOut();
        navigateTo("/");
      }
    });
  };

  return (
    <nav>
      <Link to="/home" className="title">
        <h2 className="brand">e-Leporidae</h2>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <BsJustify className="icons menu-icon" />
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/adopt">Adopt a Rabbit</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
        <li>
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="" className="to-hide">
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/myapplication" className="to-hide">
            Application
          </NavLink>
        </li>
        <li>
          <NavLink className="to-hide" onClick={handleLogout}>
            Logout
          </NavLink>
        </li>
        <div onClick={() => setDropdown((prev) => !prev)}>
          <MdAccountCircle className="profile" />
        </div>

        {dropdown && <DropdownMenu />}
      </ul>
    </nav>
  );
}

export default Navbar;
