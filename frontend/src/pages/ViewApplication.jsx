import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function ViewApplication({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <button className="secondary" onClick={handleShow}>
        View
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Application details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <br />
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              value={data.fullname}
              name="fullname"
              className="form-control"
              readOnly
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={data.email}
              name="email"
              className="form-control"
              readOnly
            />
            <br />
            <label htmlFor="phone">Phone</label>

            <input
              type="tel"
              value={data.phone}
              name="phone"
              className="form-control"
              readOnly
            />
            <br />
            <label htmlFor="date">Date</label>

            <input
              type="date"
              value={data.adoption_date}
              name="date"
              className="form-control"
              readOnly
            />
            <br />
            <label>Address</label>
            <div className="address">
              <Form.Select
                aria-label="Default select example"
                value={data.province}
                name="province"
                readOnly
              >
                <option value="" hidden>
                  Province
                </option>
                <option value="Camarines Sur">Camarines Sur</option>
              </Form.Select>
              <input
                type="text"
                value={data.city}
                name="city"
                placeholder="City/Municipality"
                className="form-control"
                readOnly
              />
              <input
                type="text"
                value={data.barangay}
                name="barangay"
                placeholder="Barangay"
                className="form-control"
                readOnly
              />
              <input
                type="text"
                value={data.postal_code}
                name="postalcode"
                placeholder="Postal code"
                className=" form-control"
                readOnly
              />
            </div>
            <br />
            <hr />
            <br />
            <label htmlFor="environment">Home environment</label>
            <input type="file" className="form-control" />
            <br />
            <label htmlFor="reason">
              Reason for Adoption
              <textarea
                value={data.reason_for_adoption}
                name="reason"
                rows={2}
                cols={100}
                className="form-control"
                readOnly
              />
            </label>
            <br />
            <label htmlFor="otherpets">
              Other pets
              <textarea
                value={data.other_pets}
                name="otherpets"
                rows={2}
                cols={100}
                className="form-control"
                readOnly
                placeholder="If any"
              />
            </label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Link className="primary">Edit</Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewApplication;
