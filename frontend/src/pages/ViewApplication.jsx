import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Modal, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import SecureStore from "react-secure-storage";

function ViewApplication({ data }) {
  const user = SecureStore.getItem("userToken");
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="text" onClick={showModal}>
        View
      </Button>
      <Modal
        title="Details"
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" type="text" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div>
          <div className="d-flex justify-content-between">
            <p>Adoption ID</p>
            <p>{data.id}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Full Name</p>
            <p>{user.name}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Address</p>
            <p>
              {data.barangay}, {data.city}, {data.province}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Phone</p>
            <p>{data.phone}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Why choose rabbit</p>
            <p>{data.reason_for_adoption}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Delivery Option</p>
            <p>{data.service_option}</p>
          </div>
          {/* <div>
            <p>Home Environment</p>
            <img
              src={`http://localhost:8081/uploads/${data.home_environment_image_path}`}
              alt=""
            />
          </div> */}
          <div className="d-flex justify-content-between">
            <p>Rabbit ID</p>
            <p>{data.rabbit_id}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Adoption Fee</p>
            <p>{data.price}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewApplication;
