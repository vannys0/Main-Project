import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Card from "react-bootstrap/Card";
import "./style.css";
import axios from "axios";
import RabbitData from "./RabbitData.jsx";
import Footer from "../components/footer.jsx";
import { Input, Image, Avatar } from "antd";
import adopt from "../images/adopt.jpg";
import AboutRabbit from "./AboutRabbit.jsx";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Adopt() {
  const [rabbits, setRabbits] = useState([]);
  const [record, setRecord] = useState([]);
  const navigateTo = useNavigate();

  const handleNavigate = (record) => {
    navigateTo(`/rabbit_details/${record.id}`, {
      state: { data },
    });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/adopt`)
      .then((res) => {
        setRabbits(res.data);
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Filter = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredRabbits = rabbits.filter((rabbit) =>
      rabbit.name.toLowerCase().includes(lowerCaseValue)
    );
    setRecord(filteredRabbits);
  };

  return (
    <div className="main-div bg-light">
      <Navbar />
      <img src={adopt} alt="" loading="lazy" />
      <div className="adopt-div bg-light">
        {/* <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How to adopt a rabbit</Accordion.Header>
            <Accordion.Body>
              <h5>
                Step 1. See <a href="#adoptable">Adoptable rabbits</a>
              </h5>
              <br />
              <h5>Step 2. Complete the adoption form.</h5>
              <br />
              <h5>Step 3. Once application is completed, submit the form.</h5>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Who can adopt a rabbit</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion> */}
        <div className="d-flex justify-content-between">
          <h3>Adoptable rabbits</h3>
          <div className="d-flex">
            <input
              className="input-search"
              onChange={(e) => Filter(e.target.value)}
              placeholder="Type here..."
            ></input>
            <button
              className="btn-search"
              onClick={() => Filter(e.target.value)}
            >
              Search
            </button>
          </div>
        </div>
        <div id="adoptable" className="rabbitList bg-light">
          {record.length > 0 ? (
            record.map((data, i) => (
              <div
                key={i}
                className="w-100 d-flex gap-3 p-3"
                onClick={() =>
                  navigateTo(`/rabbit_details/${data.id}`, { state: { data } })
                }
              >
                <Avatar
                  style={{ borderRadius: "0" }}
                  shape="square"
                  size={150}
                  src={
                    <img
                      loading="lazy"
                      src={`http://localhost:8081/uploads/${data.image_path
                        .split(",")[0]
                        .trim()}`}
                    />
                  }
                />
                <div className="d-flex flex-column gap-1">
                  <h4>{data.name}</h4>
                  <span>{data.breed_type}</span>
                  <span>{data.color}</span>
                  <span>{data.sex}</span>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "70dvh",
                backgroundColor: "#f8f9fa",
                border: "none",
              }}
            >
              <h4>No rabbits found</h4>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adopt;
