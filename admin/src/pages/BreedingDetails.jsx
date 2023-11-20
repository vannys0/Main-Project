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

  return (
    <>
      <div className="d-flex justify-content-center">
        <Button type="text" className="w-100" onClick={showModal}>
          View
        </Button>
      </div>
      <Modal
        title={`Details`}
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
            <p>Pairing Date :</p>
            <p>{data.pairing_date}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BreedingDetails;
