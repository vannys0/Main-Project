import React, { useContext, useEffect, useState } from "react";
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
import { LuUsers, LuUser, LuLayoutDashboard } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import "./Sidebar.css";
import Logo from "../images/logo.png";
import { Avatar } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { RiPassPendingLine } from "react-icons/ri";
import Swal from "sweetalert2";
import Default from "../images/default-profile.png";
import SecureStore from "react-secure-storage";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const user = SecureStore.getItem("userToken");
  const navigateTo = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const hasProfileImage = userInfo && userInfo.profile;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get_user_info/${user.id}`)
      .then((res) => {
        setUserInfo(res.data[0]);
      })
      .catch();
  }, [user.id]);

  function onLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
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
        <div className="sidebar-brand">
          <h3 className="gradient-text">eLeporidae</h3>
          {/* <img className="logo" src={Logo} alt="" /> */}
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <AiOutlineClose />
        </span>
      </div>
      <ul className="sidebar-list">
        <h6 style={{ marginLeft: "20px", color: "#797979", fontWeight: "600" }}>
          MAIN MENU
        </h6>
        <NavLink to="/dashboard" className="sidebar-list-item">
          <LuLayoutDashboard className="icon" /> Dashboard
        </NavLink>
        <NavLink to="/breeding" className="sidebar-list-item">
          <BsListCheck className="icon" /> Breeding
        </NavLink>
        <NavLink to="/rabbits" className="sidebar-list-item">
          <CiCircleList className="icon" /> Rabbits
        </NavLink>
        <h6
          style={{
            marginLeft: "20px",
            color: "#797979",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          ADOPTIONS
        </h6>
        <NavLink to="/request" className="sidebar-list-item">
          <RiPassPendingLine className="icon" /> Request
        </NavLink>
        <h6
          style={{
            marginLeft: "20px",
            color: "#797979",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          DELIVERY
        </h6>
        <NavLink to="/delivery" className="sidebar-list-item">
          <BsTruck className="icon" /> Delivery
        </NavLink>
        <h6
          style={{
            marginLeft: "20px",
            color: "#797979",
            fontWeight: "600",
            marginTop: "10px",
          }}
        >
          USERS
        </h6>
        <NavLink to="/clients" className="sidebar-list-item">
          <LuUsers className="icon" /> Users
        </NavLink>
      </ul>
    </aside>
  );
}

export default Sidebar;
