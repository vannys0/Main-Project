import React from "react";
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
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./Sidebar.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
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
          <Link to="">
            <BsPeopleFill className="icon" /> clients
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="">
            <BsBoxArrowLeft className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
