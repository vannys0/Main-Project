import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dropdown.css";
import { AiOutlineForm } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";

function DropdownMenu() {
  const navigateTo = useState();
  const authContext = useContext(AuthContext);
  const user = SecureStore.getItem("userToken");

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
    <div className="dropdown">
      <ul className="">
        <h4>{user.name}</h4>
        <Link>
          <AiOutlineForm className="icon icons" />
          My Profile
        </Link>
        <Link to="/myapplication">
          <AiOutlineForm className="icon icons" />
          Application
        </Link>
        <Link onClick={handleLogout}>
          <BiLogOut className="icon icons" />
          Logout
        </Link>
      </ul>
    </div>
  );
}

export default DropdownMenu;
