import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Card from "react-bootstrap/Card";
import "./style.css";
import axios from "axios";
import RabbitData from "./RabbitData.jsx";
import Footer from "../components/footer.jsx";
import { Input, Image, Avatar } from "antd";
import adopt from "../images/a.jpg";
import AboutRabbit from "./AboutRabbit.jsx";
import { Link, useNavigate } from "react-router-dom";
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
      years--;
      months = 12 + months;
    }

    return `${years} yrs and ${months} mos`;
  };

  return (
    <div className="main-div bg-light">
      <Navbar />
      <img src={adopt} alt="" loading="lazy" />
      <div className="adopt-div bg-light">
        <div className="btn-field">
          <h3>Adoptable rabbits</h3>
          <input
            className="input-search"
            onChange={(e) => Filter(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div id="adoptable" className="rabbitList bg-light">
          {record.length > 0 ? (
            record.map((data, i) => (
              <div key={i} className="w-100 d-flex gap-3 p-3">
                <Avatar
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
                  <span>{calculateAge(data.date_of_birth)}</span>
                  <span>{data.sex}</span>
                  <span>{data.breed_type}</span>
                  <span>{data.color}</span>
                  <AboutRabbit data={data} />
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
