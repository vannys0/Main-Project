import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Avatar, message } from "antd";
import {} from "@ant-design/icons";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;
import SecureStore from "react-secure-storage";

function AdminProfile() {
  const user = SecureStore.getItem("userToken");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Admin Profile</h3>
        <div className="client-profile">
          <Avatar
            style={{
              fontSize: "70px",
              padding: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />
          <div className="client-data">
            <p>Role: {user.user_type}</p>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
