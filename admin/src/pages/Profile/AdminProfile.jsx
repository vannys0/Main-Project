import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../Style.css";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Avatar, message } from "antd";
import {} from "@ant-design/icons";
import appConfig from "../../../config.json";
const BASE_URL = appConfig.apiBasePath;
import SecureStore from "react-secure-storage";
import UploadProfile from "./UploadProfile";

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
          <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
            <Avatar
              style={{
                fontSize: "70px",
                padding: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
            <UploadProfile />
          </div>
          <div className="client-data">
            <div>
              <p>User Type</p>
              <p>: {user.user_type}</p>
            </div>
            <div>
              <p>User ID</p>
              <p>: {user.id}</p>
            </div>
            <div>
              <p>Name</p>
              <p>: {user.name}</p>
            </div>
            <div>
              <p>Email</p>
              <p>: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
