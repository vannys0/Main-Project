import React, { useState } from "react";
import { Button, Modal } from "antd";

function BreedingDetails({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <span className="w-100" onClick={showModal}>
          View
        </span>
      </div>
      <Modal
        title={`Breeding Details`}
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
        <div className="details-div">
          <div className="d-flex justify-content-between">
            <p>ID</p>
            <p>{data.id}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Male Id</p>
            <p>{data.buck_id}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Female Id</p>
            <p>{data.doe_id}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Note</p>
            <p>{data.note}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Pairing Date</p>
            <p>{formatDate(data.pairing_date)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Estimated Due Date</p>
            <p>{formatDate(data.expected_due_date)}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BreedingDetails;
