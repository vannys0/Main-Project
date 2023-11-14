import React, { useContext } from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsTruck,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsBoxArrowLeft,
  BsFillCollectionFill,
  BsPersonFill,
  BsPersonCircle,
} from "react-icons/bs";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./Sidebar.css";
import { AuthContext } from "../App";
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const user = SecureStore.getItem("userToken");
  const authContext = useContext(AuthContext);
  const navigateTo = useNavigate();

  function onLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        authContext.signOut();
        navigateTo("/");
      }
    });
  }

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">E-Leporidae</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <AiOutlineClose />
        </span>
      </div>

      <ul className="sidebar-list">
        <div className="admin-side" onClick={() => navigateTo("/profile")}>
          <div>
            <BsPersonCircle className="icons" />
          </div>
          <div className="admin-user">
            <h5>{user.name}</h5>
            <h6>Admin</h6>
          </div>
        </div>
        <NavLink to="/dashboard" className="sidebar-list-item">
          <BsGrid1X2Fill className="icon" /> Dashboard
        </NavLink>
        <NavLink to="/profile" className="sidebar-list-item">
          <BsPersonFill className="icon" /> Profile
        </NavLink>
        <NavLink to="/rabbits" className="sidebar-list-item">
          <BsFillGrid3X3GapFill className="icon" /> Rabbit List
        </NavLink>
        <NavLink to="/breeding" className="sidebar-list-item">
          <BsListCheck className="icon" /> Breeding
        </NavLink>

        <NavLink to="/request" className="sidebar-list-item">
          <BsFillCollectionFill className="icon" /> Request
        </NavLink>

        <NavLink to="/delivery" className="sidebar-list-item">
          <BsTruck className="icon" /> Delivery
        </NavLink>
        {/* <NavLink to="/rabbit-sales" className="sidebar-list-item">
          <BsPeopleFill className="icon" /> Rabbit Sales
        </NavLink> */}
        <NavLink to="/clients" className="sidebar-list-item">
          <BsPeopleFill className="icon" /> Users
        </NavLink>
        <Link to="" onClick={onLogout} className="sidebar-list-item">
          <BsBoxArrowLeft className="icon" /> Logout
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;
