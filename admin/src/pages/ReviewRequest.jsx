import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Button, Modal } from "antd";

function ReviewRequest({ data }) {
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
      <Button onClick={showModal}>View</Button>
      <Modal
        title="Details"
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <p>Fullname</p>
            <p>{data.fullname}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Phone number</p>
            <p>{data.phone}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Address</p>
            <p>
              {data.province}, {data.city}, {data.barangay}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Reason to Adopt</p>
            <p>{data.reason_for_adoption}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Other Pets</p>{" "}
            <p>{data.other_pets ? data.other_pets : "None"}</p>
          </div>
          <div></div>
        </div>
        <div>
          <p>Home Environment</p>
          <img
            src={`http://localhost:8081/uploads/${data.home_environment_image_path}`}
            className="w-100"
          />
        </div>
      </Modal>
    </>
  );
}

export default ReviewRequest;
