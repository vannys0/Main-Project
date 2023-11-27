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
  const [downloaded, setDownloaded] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const downloadQRCode = () => {
    const canvas = document.createElement("canvas");
    const qrCodeContainer = document.getElementById("myqrcode");

    if (qrCodeContainer) {
      const qrCodeCanvas = qrCodeContainer.querySelector("canvas");

      if (qrCodeCanvas) {
        const ctx = canvas.getContext("2d");
        const padding = 20;

        canvas.width = qrCodeCanvas.width + padding * 2;
        canvas.height = qrCodeCanvas.height + padding * 2;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(qrCodeCanvas, padding, padding);

        const url = canvas.toDataURL();
        const a = document.createElement("a");
        a.download = `${values.name}_QRCode.png`;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
    setDownloaded(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button className="w-100" onClick={showModal}>
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

          {!downloaded ? (
            <Button type="primary" onClick={downloadQRCode}>
              Download QR Code
            </Button>
          ) : (
            <Button type="primary" className="w-100">
              Downloaded
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default RabbitQr;
