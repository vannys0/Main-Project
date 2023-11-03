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

function Header({ OpenSidebar }) {
  const user = SecureStore.getItem("userToken");
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <h5></h5>
      </div>
      <div className="header-right">
        <Badge count={20}>
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
