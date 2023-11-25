import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../Style.css";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Avatar, message, Image } from "antd";
import ImgCrop from "antd-img-crop";
import {} from "@ant-design/icons";
import appConfig from "../../../config.json";
const BASE_URL = appConfig.apiBasePath;
import SecureStore from "react-secure-storage";
import UploadProfile from "./UploadProfile";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

function AdminProfile() {
  const user = SecureStore.getItem("userToken");
  const { id } = useParams();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [userInfo, setUserInfo] = useState([]);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const hasProfileImage = userInfo && userInfo.profile;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/get_user_info/${id}`)
      .then((res) => {
        setUserInfo(res.data[0]);
      })
      .catch();
  }, [id]);

  const handleUpload = () => {
    inputRef.current.click();
  };

  const handleUploadProfile = () => {
    const formData = new FormData();
    formData.append("file", image);
    Swal.fire({
      title: "Confirm?",
      text: "Set as Profile Image?",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#797979",
      confirmButtonText: "Save changes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${BASE_URL}/upload-profile-picture/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Saved",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    console.log(e.target.files);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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
          <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
            <div>
              {image ? (
                <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                  <Avatar
                    style={{
                      width: "168px",
                      height: "168px",
                      border: "5px solid #eaeaea",
                    }}
                    src={
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    }
                  />
                  <Button onClick={handleUploadProfile}>Upload profile</Button>
                </div>
              ) : hasProfileImage ? (
                <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                  <Avatar
                    style={{
                      width: "168px",
                      height: "168px",
                      border: "5px solid #eaeaea",
                    }}
                    src={
                      <img
                        src={`http://localhost:8081/uploads/${userInfo.profile}`}
                        alt=""
                        style={{ width: "100%" }}
                      />
                    }
                  />
                  <Button onClick={handleUpload}>Change profile</Button>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
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
                  <Button onClick={handleUpload}>Upload profile</Button>
                </div>
              )}

              <input
                type="file"
                name="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>

            {/* <UploadProfile /> */}
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
