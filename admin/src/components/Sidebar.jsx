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
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./Sidebar.css";
import { AuthContext } from "../App";
import Swal from "sweetalert2";
function Sidebar({ openSidebarToggle, OpenSidebar }) {
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
        Swal.fire("Logged out!", "You have been logout.", "success");
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
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/rabbits">
            <BsFillGrid3X3GapFill className="icon" /> Rabbit List
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/breeding">
            <BsListCheck className="icon" /> Breeding
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/request">
            <BsFillCollectionFill className="icon" /> Request
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/delivery">
            <BsTruck className="icon" /> Delivery
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/clients">
            <BsPeopleFill className="icon" /> clients
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="" onClick={onLogout}>
            <BsBoxArrowLeft className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
