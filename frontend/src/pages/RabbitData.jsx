import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";
import "./style.css";
import adopt from "../images/adopt.jpg";
import { Avatar, Image, Button } from "antd";
import { Carousel } from "react-bootstrap";
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
      <div className="rabbit-data-div bg-light">
        {data && (
          <div>
            <div className="images">
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
            <div className="statement">
              <h4>
                Hi, my name is {data.name} and I am looking for a new home.
              </h4>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <SiRabbitmq />
              </button>
              <span>{data.id}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <MdDriveFileRenameOutline />
              </button>
              <span>{data.name}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              {data && data.sex === "Male" ? (
                <button className="btn btn-success">
                  <IoMdMale />
                </button>
              ) : (
                <button className="btn btn-success">
                  <IoFemaleSharp />
                </button>
              )}
              <span>{data.sex}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <MdOutlineBloodtype />
              </button>
              <span>{data.breed_type}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <LiaBirthdayCakeSolid />
              </button>
              <span>
                {age.years} years {age.months} months
              </span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <MdOutlineColorLens />
              </button>
              <span>{data.color}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <MdPets />
              </button>
              <span>{data.rabbit_type}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <TbWeight />
              </button>
              <span>{data.weight}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <button className="btn btn-success">
                <IoPricetagsOutline />
              </button>
              <span>Php{data.price}</span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <Button
                className="apply-btn"
                type="primary"
                onClick={() =>
                  navigateTo(
                    `/rabbitdata/${JSON.stringify(data)}/${data.id}/adopt-form`
                  )
                }
              >
                Apply for Adoption
              </Button>
              <Button type="text" onClick={() => navigateTo("/adopt")}>
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RabbitData;
