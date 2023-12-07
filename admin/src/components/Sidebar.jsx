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
import { AuthContext } from "../App";
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
  const authContext = useContext(AuthContext);
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
          <img src={Logo} alt="" />
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <AiOutlineClose />
        </span>
      </div>
      <ul className="sidebar-list">
        <div
          className="admin-side"
          onClick={() => navigateTo(`/profile/${user.id}`)}
        >
          <div>
            {hasProfileImage ? (
              <Avatar
                style={{
                  width: "40px",
                  height: "40px",
                }}
                src={
                  <img
                    src={`http://localhost:8081/uploads/${userInfo.profile}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                }
              />
            ) : (
              <Avatar
                style={{
                  width: "40px",
                  height: "40px",
                }}
                src={<img src={Default} alt="" />}
              />
            )}
          </div>
          <div className="admin-user">
            <h5>{user.name}</h5>
            <h6>{user.user_type}</h6>
          </div>
        </div>
        <NavLink to="/dashboard" className="sidebar-list-item">
          <LuLayoutDashboard className="icon" /> Dashboard
        </NavLink>
        <NavLink to={`/profile/${user.id}`} className="sidebar-list-item">
          <LuUser className="icon" /> Profile
        </NavLink>
        <NavLink to="/rabbits" className="sidebar-list-item">
          <CiCircleList className="icon" /> Rabbits
        </NavLink>
        <NavLink to="/breeding" className="sidebar-list-item">
          <BsListCheck className="icon" /> Breeding
        </NavLink>

        <NavLink to="/request" className="sidebar-list-item">
          <RiPassPendingLine className="icon" /> Request
        </NavLink>

        <NavLink to="/delivery" className="sidebar-list-item">
          <BsTruck className="icon" /> Delivery
        </NavLink>
        <NavLink to="/clients" className="sidebar-list-item">
          <LuUsers className="icon" /> Users
        </NavLink>
        <Link to="" onClick={onLogout} className="sidebar-list-item">
          <BsBoxArrowLeft className="icon" /> Logout
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;
