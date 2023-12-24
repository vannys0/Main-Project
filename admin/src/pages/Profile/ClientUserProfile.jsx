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
        <div className="client-profile">
          <div className="d-flex align-items-center justify-content-center">
            {data.profile ? (
              <Avatar
                shape="square"
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
                shape="square"
                style={{
                  width: "168px",
                  height: "168px",
                  border: "5px solid #eaeaea",
                }}
                src={<img src={Default} alt="" />}
              />
            )}
          </div>
          <div className="client-data">
            <div>
              <p>User Type</p>
              <p>{data.user_type}</p>
            </div>
            <div>
              <p>User ID</p>
              <p>{data.id}</p>
            </div>
            <div>
              <p>Name</p>
              <p>{data.name}</p>
            </div>
            <div>
              <p>Email</p>
              <p>{data.email}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ClientUserProfile;
