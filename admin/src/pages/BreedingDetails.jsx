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
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <span className="w-100" onClick={showModal}>
          View
        </span>
      </div>
      <Modal
        title={`Details`}
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
          <div>
            <p>ID : </p>
            <p>{data.id}</p>
          </div>
          <div>
            <p>Male Id :</p>
            <p>{data.buck_id}</p>
          </div>
          <div>
            <p>Female Id :</p>
            <p>{data.doe_id}</p>
          </div>
          <div>
            <p>Note :</p>
            <p>{data.note}</p>
          </div>
          <div>
            <p>Pairing Date :</p>
            <p>{formatDate(data.pairing_date)}</p>
          </div>
          <div>
            <p>Estimated Due Date :</p>
            <p>{formatDate(data.expected_due_date)}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BreedingDetails;
