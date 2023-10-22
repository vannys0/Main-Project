import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import Rabbit from "../images/rabbit-contact.png";

function AboutRabbit({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const [rabbit, setRabbit] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/adopt")
      .then((res) => {
        console.log(res);
        setRabbit(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <button className="btn form-control see-details" onClick={handleShow}>
        See datails
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>About {data.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-div">
            <img src={`http://localhost:8081/uploads/${data.image_path}`} alt="" />
          </div>
          <br />
          <p>Hi, my name is {data.name} and I am looking for a new home.</p>
          <div className="d-flex">
            <div className="w-25">
              <h6>Rabbit Id</h6>
              <h6>Breed</h6>
              <h6>Sex</h6>
              <h6>Age</h6>
              <h6>Weight</h6>
            </div>
            <div>
              <h6>: {data.id}</h6>
              <h6>: {data.breed} Other</h6>
              <h6>: {data.sex}</h6>
              <h6>: {data.age} months</h6>
              <h6>: {data.weight} pounds</h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link
            to={`/rabbitdata/${data.name}/${data.id}/adopt-form`}
            className="btn btn-primary"
          >
            Apply for adoption
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AboutRabbit;
