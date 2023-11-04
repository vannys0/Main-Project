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
      <Button type="text" onClick={showModal}>
        View
      </Button>
      <Modal
        title="Details"
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="d-flex">
          <div className="w-50">
            <p>Fullname</p>
            <p>Phone number</p>
            <p>Address</p>
            <p>Reason to Adopt</p>
            <p>Other Pets</p>
          </div>
          <div>
            <p>: {data.fullname}</p>
            <p>: {data.phone}</p>
            <p>
              : {data.province}, {data.city}, {data.barangay}
            </p>
            <p>: {data.reason_for_adoption}</p>
            <p>: {data.other_pets}</p>
          </div>
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
