import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { DownOutlined } from "@ant-design/icons";
import "./Header.css";
import { Badge, Space, Typography, Dropdown, Avatar } from "antd";
import Default from "../images/default-profile.png";
import AdminUserProfile from "../pages/Profile/AdminUserProfile";
import Swal from "sweetalert2";
import axios from "axios";
import SecureStore from "react-secure-storage";
import { AuthContext } from "../App";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Header({ OpenSidebar }) {
  const user = SecureStore.getItem("userToken");
  const authContext = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [pending, setPending] = useState();
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

  useEffect(() => {
    axios
      .get(BASE_URL + "/pending-adoption")
      .then((response) => {
        setPending(response.data[0].pending);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const items = [
    pending === 0
      ? {
          key: "0",
          label: (
            <span>
              <b>Notifications</b>
            </span>
          ),
        }
      : {
          key: "0",
          label: (
            <span>
              <b>Notifications</b>
            </span>
          ),
        },
    {
      key: "1",
      label: (
        <span onClick={() => navigateTo("/request")}>
          You have {pending} pending request
        </span>
      ),
    },
  ];

  const admin = [
    {
      label: <h5>{user.name}</h5>,
      key: "0",
    },
    {
      label: <AdminUserProfile />,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <span onClick={onLogout}>Logout</span>,
      key: "2",
    },
  ];

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
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <h5></h5>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-4">
        <Badge count={pending} dot>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottom"
          >
            <Space>
              <BsFillBellFill className="icon" style={{ color: "#797979" }} />
            </Space>
          </Dropdown>
        </Badge>
        <Dropdown
          menu={{
            items: admin,
          }}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <div className="d-flex align-items-center gap-1">
            <span>
              {hasProfileImage ? (
                <Avatar
                  src={
                    <img
                      src={`http://localhost:8081/uploads/${userInfo.profile}`}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  }
                />
              ) : (
                <Avatar src={<img src={Default} alt="" />} />
              )}
            </span>
            <span>{user.name}</span>
            <DownOutlined style={{ color: "#1e1e1e" }} />
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;
