import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Button, Modal } from "react-bootstrap";

function ReviewRequest({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex">
        <button className="secondary" onClick={handleShow}>
          Review
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: "#00828c" }}>
          <Modal.Title style={{ color: "#fff" }}>
            Application details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="w-50">
              <p>Rabbit Id</p>
              <p>Adopter Fullname</p>
              <p>Phone</p>
              <p>Address</p>
              <p>Reason to Adopt</p>
              <p>Other Pets</p>
            </div>
            <div>
              <p>: {data.rabbit_id}</p>
              <p>: {data.fullname}</p>
              <p>: {data.phone}</p>
              <p>
                : {data.province} {data.city} {data.barangay}
              </p>
              <p>: {data.reason_for_adoption}</p>
              <p>: {data.other_pets}</p>
            </div>
          </div>
          <div>
            <p>Home Environment</p>
            <img
              src={`http://localhost:8081/uploads/${data.home_environment_image_path}`}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewRequest;
