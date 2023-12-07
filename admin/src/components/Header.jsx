import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import "./Header.css";
import SecureStore from "react-secure-storage";
import { Badge, Space, Typography, Dropdown } from "antd";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Header({ OpenSidebar }) {
  const user = SecureStore.getItem("userToken");
  const navigateTo = useNavigate();
  const [pending, setPending] = useState();
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
    {
      key: "1",
      label: (
        <a
          style={{ textDecoration: "none" }}
          rel="noopener noreferrer"
          href="/request"
          onClick={() => navigateTo("/request")}
        >
          You have {pending} pending request
        </a>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <h5></h5>
      </div>
      <div className="header-right">
        <Badge count={pending}>
          <Dropdown
            menu={{
              items,
              selectable: true,
            }}
          >
            <Space>
              <BsFillBellFill className="icon" />
            </Space>
          </Dropdown>
        </Badge>
      </div>
    </header>
  );
}

export default Header;
