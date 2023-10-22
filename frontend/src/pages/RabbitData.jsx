import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AdoptForm from "./AdoptForm";
import axios from "axios";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import Rabbit from "../images/rabbit-contact.png";
import Navbar from "../components/Navbar";
import { IoIosArrowRoundBack } from "react-icons/io";

function RabbitData() {
  const { id } = useParams();
  console.log(id);
  const [rabbits, setRabbits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/rabbitdata/" + id)
      .then((res) => {
        console.log(res);
        setRabbits(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-div">
      <Navbar />
      <div className="rabbit-data-div">
        <div className="cards">
          <h2>About {rabbits.name}</h2>
          <div>
            <Link to="/adopt" className="back">
              <IoIosArrowRoundBack className="icons" /> Back
            </Link>
          </div>
          <div className="img-div">
            <img variant="top" src={Rabbit} /> <br />
          </div>
          <div className="cards-body">
            <div className="cards-title">{rabbits.name}</div>
            <div className="cards-text">
              <h5>Hi, I'm {rabbits.name} and I am looking for a new home. </h5>
              <br />
              <div className="data-div">
                <div>
                  <h5>Rabbit Id</h5>
                  <h5>Breed</h5>
                  <h5>Sex</h5>
                  <h5>Age</h5>
                  <h5>Weight</h5>
                </div>
                <div>
                  <h5>: {rabbits.id}</h5>
                  <h5>: {rabbits.breed}</h5>
                  <h5>: {rabbits.sex}</h5>
                  <h5>: {rabbits.age} months</h5>
                  <h5>: {rabbits.weight} klgs</h5>
                </div>
              </div>
            </div>
            <div>
              <Link
                to={`/rabbitdata/${rabbits.id}/adopt-form`}
                className="btn form-control apply-btn"
              >
                Apply for Adopt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RabbitData;
