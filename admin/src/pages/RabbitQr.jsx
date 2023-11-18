import React, { useEffect, useState } from "react";
import { Space, QRCode, Button, Modal } from "antd";
import { useParams } from "react-router";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function RabbitQr({ values }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = `${values.name}_QRCode.png`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button type="primary" className="w-100" onClick={showModal}>
          Generate QR Code
        </Button>
      </div>
      <Modal
        title={`QR Code for ${values.name}`}
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
        <div className="d-grid justify-content-center flex-direction-column">
          <div id="myqrcode">
            <QRCode
              size={250}
              value={values.id}
              bgColor="#fff"
              style={{
                marginBottom: 16,
              }}
            />
          </div>
          <Button type="primary" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default RabbitQr;
