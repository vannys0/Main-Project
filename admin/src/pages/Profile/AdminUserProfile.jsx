import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "../../Style.css";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Upload, Button, Avatar, Image, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import {} from "@ant-design/icons";
import SecureStore from "react-secure-storage";
import Default from "../../images/default-profile.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import appConfig from "../../../config.json";
const BASE_URL = appConfig.apiBasePath;
const IMAGE_URL = appConfig.imagePath;

function AdminUserProfile() {
  const user = SecureStore.getItem("userToken");
  const id = user.id;
  const [userInfo, setUserInfo] = useState([]);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const hasProfileImage = userInfo && userInfo.profile;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      text: "Set this picture as your profile?",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#797979",
      confirmButtonText: "Save",
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

  return (
    <div>
      <span onClick={showModal}>My Profile</span>
      <Modal
        style={{
          top: 20,
        }}
        title="My Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="profile-div">
          <div className="admin-thumbnail"></div>
          <div className="d-flex justify-content-center">
            {image ? (
              <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                <Avatar
                  style={{
                    width: "168px",
                    height: "168px",
                    border: "5px solid #ffffff",
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
                    border: "5px solid #ffffff",
                  }}
                  src={
                    <img
                      src={`${IMAGE_URL}/uploads/${userInfo.profile}`}
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
                    width: "168px",
                    height: "168px",
                    border: "5px solid #ffffff",
                  }}
                  src={<img src={Default} alt="" />}
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
          <div className="client-info">
            <div className="d-flex justify-content-between">
              <p>User ID</p>
              <p>{userInfo.id}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Full Name</p>
              <p>{userInfo.name}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Email</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminUserProfile;
