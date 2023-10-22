import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dropdown.css";
import { AiOutlineForm } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";

function DropdownMenu() {
  const navigate = useState();
  const authContext = useContext(AuthContext);

  const user = SecureStore.getItem("userToken");

  const handleLogout = () => {
    // Remove secure storage
    SecureStore.clear();
    authContext.signOut();
    toast.success("Logged out successfully");
    // Redirect to the login page or any other desired route
    navigate("/login");
  };
  return (
    <div className="dropdown">
      <ul className="">
        <h3>{user.name}</h3>
        <Link to="/myapplication">
          <AiOutlineForm className="icon icons" />
          My application
        </Link>
        <Link to="/" onClick={handleLogout}>
          <BiLogOut className="icon icons" />
          Logout
        </Link>
      </ul>
    </div>
  );
}

export default DropdownMenu;
