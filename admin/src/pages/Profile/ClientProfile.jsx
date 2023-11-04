import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../Style.css";
import appConfig from "../../../config.json";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const BASE_URL = appConfig.apiBasePath;
import SecureStore from "react-secure-storage";

function ClientProfile() {
  const user = SecureStore.getItem("userToken");
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { id } = useParams();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/client-profile/" + id)
      .then((res) => {
        setClients(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>Client Profile</h3>
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
            <p>Client ID: {clients.id}</p>
            <p>Name: {clients.name}</p>
            <p>Email: {clients.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
