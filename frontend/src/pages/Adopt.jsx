import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Card from "react-bootstrap/Card";
import "./style.css";
import axios from "axios";
import RabbitData from "./RabbitData.jsx";
import Footer from "../components/footer.jsx";
import { Input } from "antd";
import AboutRabbit from "./AboutRabbit.jsx";

function Adopt() {
  const [rabbits, setRabbits] = useState([]);
  const [record, setRecord] = useState([]);
  const photo = "http://localhost:8081/";

  useEffect(() => {
    axios
      .get("http://localhost:8081/adopt")
      .then((res) => {
        setRabbits(res.data);
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Search Filter
  const { Search } = Input;
  const Filter = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredRabbits = rabbits.filter((rabbit) =>
      rabbit.name.toLowerCase().includes(lowerCaseValue)
    );
    setRecord(filteredRabbits);
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="adopt-div">
        <div className="d-flex justify-content-between">
          <h2>Adoptable Rabbits</h2>
          <Search
            style={{
              height: "40px",
              fontSize: "16px",
              width: "300px",
              marginBottom: "20px",
              backgroundColor: "#eaeaea",
            }}
            placeholder="Search rabbit by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={Filter}
          />
        </div>
        <div className="rabbitList">
          {record.length > 0 ? (
            record.map((data, i) => (
              <Card
                key={i}
                style={{
                  width: "100%",
                  borderRadius: "0",
                  boxShadow:
                    "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
                }}
              >
                <Card.Img
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    borderRadius: "0",
                  }}
                  variant="top"
                  src={`http://localhost:8081/uploads/${
                    JSON.parse(data.image_path)[0]
                  }`}
                  height={250}
                  alt="No Image"
                />
                <Card.Body>
                  <Card.Title>{data.name}</Card.Title>
                  <Card.Text></Card.Text>
                  <AboutRabbit data={data} />
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>
              <h2>No rabbits found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Adopt;
