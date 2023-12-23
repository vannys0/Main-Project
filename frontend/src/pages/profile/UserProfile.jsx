import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Avatar } from "antd";
import axios from "axios";
import "../style.css";
import Swal from "sweetalert2";
import { UserOutlined } from "@ant-design/icons";
import SecureStore from "react-secure-storage";
import appConfig from "../../../config.json";
import { useNavigate, useParams } from "react-router-dom";
const BASE_URL = appConfig.apiBasePath;

function UserProfile() {
  const user = SecureStore.getItem("userToken");
  const id = user.id;
  const [image, setImage] = useState("");
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);
  const hasProfileImage = users && users.profile;

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
      .get(`${BASE_URL}/get_user/${id}`)
      .then((res) => {
        setUsers(res.data[0]);
      })
      .catch((err) => console.log(err));
  });

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
          .post(`${BASE_URL}/upload_profile/${id}`, formData, {
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
      <span type="primary" onClick={showModal}>
        My Profile
      </span>
      <Modal
        title="User Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<Button onClick={handleCancel}>Close</Button>}
      >
        <div className="profile-div">
          <div className="thumbnail"></div>
          <div className="d-flex justify-content-center">
            {image ? (
              <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
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
              <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
                <Avatar
                  style={{
                    width: "168px",
                    height: "168px",
                    border: "5px solid #ffffff",
                  }}
                  src={
                    <img
                      src={`http://localhost:8081/uploads/${users.profile}`}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  }
                />
                <Button onClick={handleUpload}>Change profile</Button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
                <Avatar
                  style={{
                    color: "#eaeaea",
                    fontSize: "70px",
                    padding: "82px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
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
          <div className="client-info">
            <hr style={{ height: "2px solid black", width: "100%" }} />
            <div>
              <h6>User ID</h6>
              <p>{user.id}</p>
            </div>
            <hr style={{ height: "2px solid black", width: "100%" }} />
            <div>
              <h6>Full Name</h6>
              <p>{user.name}</p>
            </div>
            <hr style={{ height: "2px solid black", width: "100%" }} />
            <div>
              <h6>Email</h6>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UserProfile;
