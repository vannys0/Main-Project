import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";
import "./style.css";
import adopt from "../images/adopt.jpg";
import { Avatar, Image, Button } from "antd";
import { Carousel } from "react-bootstrap";
import AdoptForm from "./AdoptForm";

function RabbitData() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { state } = location;
  const data = state && state.data;

  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      ageYears--;
      ageMonths = 12 - birthDate.getMonth() + currentDate.getMonth();
    }

    return { years: ageYears, months: ageMonths };
  }

  const age = calculateAge(data.date_of_birth);

  return (
    <div className="main-div bg-light">
      <Navbar />
      <img src={adopt} alt="" />
      {data && (
        <div className="rabbit-data-div">
          <div className="carousel">
            <Carousel>
              {data.image_path.split(",").map((image, index) => (
                <Carousel.Item key={index}>
                  <Image
                    src={`http://localhost:8081/uploads/${image.trim()}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="rabbit-info">
            <h4>Hi, my name is {data.name} and I am looking for a new home.</h4>
            <div>
              <p>Rabbit ID</p>
              <p>{data.id}</p>
            </div>
            <div>
              <p>Name</p>
              <p>{data.name}</p>
            </div>
            <div>
              <p>Sex</p>
              <p>{data.sex}</p>
            </div>
            <div>
              <p>Breed</p>
              <p>{data.breed_type}</p>
            </div>
            <div>
              <p>Age</p>
              <p>
                {age.years} yrs {age.months} mos
              </p>
            </div>
            <div>
              <p>Color</p>
              <p>{data.color}</p>
            </div>
            <div>
              <p>Rabbit Type</p>
              <p>{data.rabbit_type}</p>
            </div>
            <div>
              <p>Weight</p>
              <p>{data.weight} klg</p>
            </div>
            <div>
              <p>Adoption Fee</p>
              <p>Php{data.price}</p>
            </div>
          </div>
          <div className="adopt-form-container">
            <AdoptForm data={data} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default RabbitData;
