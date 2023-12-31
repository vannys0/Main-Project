import React, { useState } from "react";
import "../../Style.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Default from "../../images/default-profile.png";
import { Button, Modal } from "antd";

function ClientUserProfile({ data }) {
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
  return (
    <>
      <span style={{ cursor: "pointer" }} onClick={showModal}>
        View
      </span>
      <Modal
        style={{
          top: 20,
        }}
        title="Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div>
            <Button onClick={handleCancel}>Close</Button>
          </div>
        }
      >
        <div className="profile-div">
          <div className="thumbnail"></div>
          <div className="d-flex justify-content-center">
            {data.profile ? (
              <Avatar
                style={{
                  width: "168px",
                  height: "168px",
                  border: "5px solid #eaeaea",
                }}
                src={
                  <img
                    src={`http://localhost:8081/uploads/${data.profile}`}
                    alt=""
                    style={{ width: "100%" }}
                  />
                }
              />
            ) : (
              <Avatar
                style={{
                  width: "168px",
                  height: "168px",
                  border: "5px solid #eaeaea",
                }}
                src={<img src={Default} alt="" />}
              />
            )}
          </div>
          <div className="client-info">
            <hr style={{ height: "2px solid black", width: "100%" }} />
            <div>
              <h6>User ID</h6>
              <p>{data.id}</p>
            </div>
            <hr style={{ height: "2px solid black", width: "100%" }} />
            <div>
              <h6>Full Name</h6>
              <p>{data.name}</p>
            </div>
            <hr style={{ height: "2px solid black", width: "100%" }} />
            <div>
              <h6>Email</h6>
              <p>{data.email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ClientUserProfile;
