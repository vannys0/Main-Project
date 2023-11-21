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
      <div className="main-container bg-light">
        <h3>Client Profile</h3>
        <div className="client-profile">
          <div className="d-flex align-items-center justify-content-center">
            {clients.profile ? (
              <Avatar
                style={{
                  width: "168px",
                  height: "168px",
                  border: "5px solid #eaeaea",
                }}
                src={
                  <img
                    src={`http://localhost:8081/uploads/${clients.profile}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                }
              />
            ) : (
              <Avatar
                style={{
                  color: "#fff",
                  fontSize: "70px",
                  padding: "82px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#eaeaea",
                }}
                icon={<UserOutlined />}
              />
            )}
          </div>
          <div className="client-data">
            <div>
              <p>User Type</p>
              <p>: {clients.user_type}</p>
            </div>
            <div>
              <p>User ID</p>
              <p>: {clients.id}</p>
            </div>
            <div>
              <p>Name</p>
              <p>: {clients.name}</p>
            </div>
            <div>
              <p>Email</p>
              <p>: {clients.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
