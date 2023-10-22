import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.css";
import axios from "axios";
import RabbitData from "./RabbitData.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/footer.jsx";
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

  const Filter = (e) => {
    setRecord(
      rabbits.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="adopt-div">
        <h2>Adoptable Rabbits</h2> <br />
        <div className="search-input">
          <span>Search</span>
          <input type="text" onChange={Filter} />
          <br />
        </div>
        <div className="rabbitList">
          {record.map((data, i) => (
            <Card key={i} style={{ width: "100%" }}>
              <Card.Img className="w-100" variant="top" src= {`http://localhost:8081/uploads/${data.image_path}`} height={250} alt="No Image"/> 
              <Card.Body style={{ backgroundColor: "#00828c", color: "#fff" }}>
                <Card.Title>{data.name}</Card.Title>
                <Card.Text>
                  • {data.sex} <br />• {data.age} months <br />• {data.weight}{" "}
                  pounds
                </Card.Text>
                <AboutRabbit data={data} />
                {/* <Link
                  to={`/rabbitdata/${data.id}`}
                  className="btn form-control see-details"
                >
                  See details
                </Link> */}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adopt;
