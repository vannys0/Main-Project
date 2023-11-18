import React, { useEffect, useState } from "react";
import "../Style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { Form, Carousel } from "react-bootstrap";
import { Image, Button, Space, Input, QRCode, Avatar } from "antd";
import { breedType, rabbitColor } from "./API/RabbitApi";
import Swal from "sweetalert2";
import RabbitQr from "./RabbitQr";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api"

function EditRabbit() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [msgError, setMsgError] = useState({});
  const [values, setValues] = useState({
    name: "",
    date_of_birth: "",
    sex: "",
    breed: "",
    color: "",
    type: "",
    weight: "",
  });

  useEffect(() => {
    axios
      .get(BASE_URL + "/edit-rabbit/" + id)
      .then((res) => {
        console.log(res);
        setValues(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(BASE_URL + "/update-rabbit/" + id, values)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Updated",
          showConfirmButton: false,
          timer: 3000,
        });
        navigateTo("/rabbits");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <div className="d-flex justify-content-between">
          <h3>Edit rabbit</h3>
          <RabbitQr values={values} />
        </div>
        <div className="edit-div">
          <div className="d-flex align-items-center w-100 h-100 bg-light">
            <Carousel>
              {values.image_path &&
                typeof values.image_path === "string" &&
                values.image_path.split(",").map((image, index) => (
                  <Carousel.Item
                    key={index}
                    style={{ borderRadius: "0", backgroundColor: "#fff" }}
                  >
                    <Image
                      style={{
                        display: "block",
                        margin: "auto",
                        width: "100%",
                      }}
                      src={`http://localhost:8081/uploads/${image.trim()}`}
                      alt=""
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <form className="rabbit-form">
            <div>
              <h6>Name :</h6>
              <div>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  className="form-control"
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div>
              <h6>Date of birth :</h6>
              <div>
                <input
                  type="date"
                  name="date_of_birth"
                  value={
                    values.date_of_birth
                      ? new Date(values.date_of_birth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  className="form-control"
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div>
              <h6>Sex :</h6>
              <div>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="sex"
                >
                  <option value="" hidden>
                    {values.sex}
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </div>
            </div>

            <div>
              <h6>Breed Type :</h6>
              <div>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="breed"
                  required
                >
                  <option value={values.breed_type} hidden>
                    {values.breed_type}
                  </option>
                  {breedType.map((breed, index) => (
                    <option key={index} value={breed}>
                      {breed}
                    </option>
                  ))}
                </Form.Select>
                {msgError.breed && (
                  <span className="error-message">{msgError.breed}</span>
                )}
              </div>
            </div>
            <div>
              <h6>Color :</h6>
              <div>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="color"
                  required
                >
                  <option value={values.color} hidden>
                    {values.color}
                  </option>
                  {rabbitColor.map((color, i) => (
                    <option key={i} value={color}>
                      {color}
                    </option>
                  ))}
                </Form.Select>
                {msgError.color && (
                  <span className="error-message">{msgError.color}</span>
                )}
              </div>
            </div>
            <div>
              <h6>Rabbit Type :</h6>
              <div>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleInput}
                  name="type"
                  required
                >
                  <option value={values.rabbit_type} hidden>
                    {values.rabbit_type}
                  </option>
                  <option value="Pet rabbits">Pet rabbit</option>
                  <option value="Meat rabbits">Meat rabbit</option>
                </Form.Select>
                {msgError.type && (
                  <span className="error-message">{msgError.type}</span>
                )}
              </div>
            </div>
            <div>
              <h6>Weight :</h6>
              <div>
                <input
                  type="number"
                  name="weight"
                  step="0.1"
                  maxLength={3}
                  value={values.weight}
                  className="form-control"
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="actions justify-content-end">
                <Button
                  type="primary"
                  danger
                  onClick={() => navigateTo("/rabbits")}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRabbit;
