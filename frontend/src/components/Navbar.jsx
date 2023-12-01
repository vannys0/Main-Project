import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { MdAccountCircle } from "react-icons/md";
import Button from "react-bootstrap/Button";
import DropdownMenu from "./DropdownMenu.jsx";
import Logo from "../images/Logo.png";
import { BsJustify } from "react-icons/bs";
import Swal from "sweetalert2";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";
import axios from "axios";

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
  const [userInfo, setUserInfo] = useState([]);
  const hasProfileImage = userInfo && userInfo.profile;
  useEffect(() => {
    axios
      .get("http://localhost:8081/get_user/" + user.id)
      .then((res) => {
        setUserInfo(res.data[0]);
      })
      .catch((err) => console.log(err));
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        SecureStore.removeItem();
        authContext.signOut();
        navigateTo("/");
      }
    });
  };

  const items = [
    {
      label: <h4>{user.name}</h4>,
      key: "0",
    },
    {
      label: <Link to={`/user_profile/${user.id}`}>Profile</Link>,
      key: "1",
    },
    {
      label: <Link to="/myapplication">Application</Link>,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <Link onClick={handleLogout}>Logout</Link>,
      key: "3",
    },
  ];

  return (
    <nav>
      <Link to="/home" className="title">
        <img src={Logo} alt="" />
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
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a
              style={{ cursor: "pointer" }}
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                {hasProfileImage ? (
                  <Avatar
                    size={30}
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
                      backgroundColor: "#eaeaea",
                    }}
                    size={30}
                    icon={<UserOutlined />}
                  />
                )}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </li>
        <li>
          <NavLink to={`/user_profile/${user.id}`} className="to-hide">
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
      </ul>
    </nav>
  );
}

export default Navbar;
