import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;
import SecureStore from "react-secure-storage";
import { BsPersonCircle } from "react-icons/bs";
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
      <div className="main-container">
        <h3>Profile</h3>

        <div className="profile-div">
          <div className="icon-div">
            <BsPersonCircle className="profile-icon" />
          </div>
          <div>
            <h6>Role</h6>
            <h6>ID</h6>
            <h6>Full name</h6>
            <h6>Email</h6>
          </div>
          <div>
            <h6>: Admin</h6>
            <h6>: {user.id}</h6>
            <h6>: {user.name}</h6>
            <h6>: {user.email}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
