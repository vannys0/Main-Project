import React, { useState } from "react";
import { Button, Modal, Image } from "antd";

function UploadProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button type="primary" className="w-100" onClick={showModal}>
          Upload profile picture
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
        <div className="d-flex flex-column gap-4">
          <input
            type="file"
            name="profile"
            className="form-control"
            accept="image/*"
            onChange={onChange}
          />
          {previewImage && (
            <div>
              <img src={previewImage} alt="" style={{ maxWidth: "100%" }} />
            </div>
          )}
          <Button type="primary" className="w-100">
            Upload profile
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default UploadProfile;
