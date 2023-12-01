import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import axios from "axios";
import "./style.css";
import { Avatar, Button } from "antd";
import Swal from "sweetalert2";
import { UserOutlined } from "@ant-design/icons";
import SecureStore from "react-secure-storage";

function Profile() {
  const user = SecureStore.getItem("userToken");
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [users, setUsers] = useState([]);
  const inputRef = useRef(null);
  const hasProfileImage = users && users.profile;

  useEffect(() => {
    axios
      .get("http://localhost:8081/get_user/" + id)
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
          .post(`http://localhost:8081/upload_profile/${id}`, formData, {
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
    <div className="main-div">
      <Navbar />
      <div className="profile-div">
        <div className="thumbnail">
          <h4>Profile</h4>
        </div>
        <div className="d-flex justify-content-center">
          {image ? (
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
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
            <div className="d-flex flex-column gap-4 align-items-center justify-content-center">
              <Avatar
                style={{
                  width: "168px",
                  height: "168px",
                  border: "5px solid #eaeaea",
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
          <hr style={{ height: "2px solid black", width: "100%" }} />
          <div>
            <h6>Phone number</h6>
            <p>Phone</p>
          </div>
          <hr style={{ height: "2px solid black", width: "100%" }} />
          <div>
            <h6>Address</h6>
            <p>Address</p>
          </div>
          <hr style={{ height: "2px solid black", width: "100%" }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
