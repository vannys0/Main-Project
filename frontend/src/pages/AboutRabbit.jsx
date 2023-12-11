import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Image, Avatar } from "antd";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function AboutRabbit({ data }) {
  const navigateTo = useNavigate();
  const [rabbit, setRabbit] = useState([]);
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
      <div className="d-flex justify-content-center">
        <Button className="w-100" onClick={showModal}>
          {data.name}
        </Button>
      </div>
      <Modal
        title="Details"
        style={{
          top: 20,
        }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="adopt"
            type="primary"
            onClick={() =>
              navigateTo(
                `/rabbitdata/${JSON.stringify(data)}/${data.id}/adopt-form`
              )
            }
          >
            Adopt
          </Button>,
        ]}
      >
        <div className="image-div">
          <Carousel>
            {data.image_path.split(",").map((image, index) => (
              <Carousel.Item key={index}>
                <Avatar
                  shape="square"
                  size={300}
                  src={
                    <Image
                      src={`http://localhost:8081/uploads/${image.trim()}`}
                    />
                  }
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <br />
        <p>Hi, my name is {data.name} and I am looking for a new home.</p>
        <div className="d-flex flex-column">
          <div className="d-flex justify-content-between">
            <p>Rabbit Id</p>
            <p>{data.id}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Sex</p>
            <p>{data.sex}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Breed</p> <p>{data.breed_type}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Age</p>
            <p>
              {age.years} years {age.months} months
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Color</p>
            <p>{data.color}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Weight</p>
            <p>{data.weight} klg</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Type</p>
            <p>{data.rabbit_type}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>Adoption Fee</p> <p> P{data.price}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AboutRabbit;
