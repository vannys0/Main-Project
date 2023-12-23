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
import {
  MdDriveFileRenameOutline,
  MdOutlineColorLens,
  MdOutlineBloodtype,
  MdPets,
} from "react-icons/md";
import { IoMdMale } from "react-icons/io";
import { IoFemaleSharp, IoPricetagsOutline } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { TbWeight } from "react-icons/tb";
import { SiRabbitmq } from "react-icons/si";

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
            <h4>
              <b>About me</b>
              <br />
              Hi, my name is {data.name} and I am looking for a new home.
            </h4>
            <div>
              <h6>Rabbit ID</h6>
              <h6>{data.id}</h6>
            </div>
            <div>
              <h6>Name</h6>
              <h6>{data.name}</h6>
            </div>
            <div>
              <h6>Sex</h6>
              <h6>{data.sex}</h6>
            </div>
            <div>
              <h6>Breed</h6>
              <h6>{data.breed_type}</h6>
            </div>
            <div>
              <h6>Age</h6>
              <h6>
                {age.years} years {age.months} months
              </h6>
            </div>
            <div>
              <h6>Color</h6>
              <h6>{data.color}</h6>
            </div>
            <div>
              <h6>Rabbit Type</h6>
              <h6>{data.rabbit_type}</h6>
            </div>
            <div>
              <h6>Weight</h6>
              <h6>{data.weight} klg</h6>
            </div>
            <div>
              <h6>Adoption Fee</h6>
              <h6>Php{data.price}</h6>
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
