import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Image, Avatar } from "antd";
import AdoptForm from "./AdoptForm";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function AboutRabbit({ data }) {
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    <>
      <Link onClick={showModal}>See more</Link>
      <Modal
        title="Rabbit Details"
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="d-flex justify-content-end gap-2">
            <Button key="cancel" onClick={handleCancel}>
              Back
            </Button>
            <AdoptForm data={data} />
          </div>,
        ]}
      >
        <div className="about-rabbit">
          <Carousel>
            {data.image_path &&
              data.image_path.split(",").map((image, index) => (
                <Carousel.Item key={index}>
                  <Avatar
                    shape="square"
                    size={250}
                    src={
                      <img
                        src={`http://localhost:8081/uploads/${image.trim()}`}
                      />
                    }
                  />
                </Carousel.Item>
              ))}
          </Carousel>
          <div className="about-rabbit-info">
            <h6>Hi, My name is {data.name}. I am looking for a new home.</h6>
            <div className="d-flex justify-content-between">
              <span>Rabbit Id</span>
              <span>{data.id}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Sex</span>
              <span>{data.sex}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Breed</span> <span>{data.breed_type}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Age</span>
              <span>
                {age.years} yrs {age.months} mos
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Color</span>
              <span>{data.color}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Weight</span>
              <span>{data.weight} kgs</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Type</span>
              <span>{data.rabbit_type}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Adoption Fee</span> <span> P{data.price}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AboutRabbit;
