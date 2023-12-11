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
      <span onClick={showModal}>View</span>
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
            <p>
              <b>{data.name}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Phone number</p>
            <p>
              <b>{data.phone}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Email</p>
            <p>
              <b>{data.email}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Address</p>
            <p>
              <b>
                {data.province}, {data.city}, {data.barangay}
              </b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Adoption Date</p>
            <p>
              <b>{data.adoption_date}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Reason to Adopt</p>
            <p>
              <b>{data.reason_for_adoption}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Other Pets</p>
            <p>
              <b>{data.other_pets ? data.other_pets : "None"}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Mode of payment</p>
            <p>
              <b>{data.mode_of_payment}</b>
            </p>
          </div>
          {data.mode_of_payment === "Agriculture" ? (
            <div className="d-flex justify-content-between">
              <p>Agricultural Product</p>
              <p>
                <b>
                  {data.agriculture_product} Amount(P
                  {data.agriculture_product_price})
                </b>
              </p>
            </div>
          ) : (
            ""
          )}
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
