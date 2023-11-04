import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import "./Header.css";
import SecureStore from "react-secure-storage";
import { Badge } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Header({ OpenSidebar }) {
  const user = SecureStore.getItem("userToken");
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
          <BsFillBellFill className="icon" />
        </Badge>
        <Badge count={10}>
          <BsFillEnvelopeFill className="icon" />
        </Badge>
      </div>
    </header>
  );
}

export default Header;
