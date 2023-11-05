import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Button, Modal } from "antd";

function RabbitSaleDialog({ o }) {
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
            <p>Amount</p>
          </div>
          <div>
            <p>: {console.log(o)}</p>
          </div>
        </div>
    
      </Modal>
    </>
  );
}

export default RabbitSaleDialog;
