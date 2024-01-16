import React, { useEffect, useState } from "react";
import "../Style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import moment from "moment";
import { Form, Carousel } from "react-bootstrap";
import {
  Image,
  Button,
  Select,
  Space,
  Input,
  InputNumber,
  Avatar,
  DatePicker,
} from "antd";
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
    breed_type: "",
    color: "",
    rabbit_type: "",
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

  const handleDateChange = (date, dateString) => {
    setValues((prev) => ({ ...prev, date_of_birth: dateString }));
  };

  const handleInputSelect = (name, value) => {
    setValues({ ...values, [name]: value });
    console.log(value);
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
          timer: 1500,
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
              <label>Name</label>
              <div>
                <Input
                  name="name"
                  style={{ fontFamily: "Poppins" }}
                  value={values.name}
                  onChange={handleInput}
                  placeholder="Name"
                />
              </div>
            </div>
            <div>
              <label>Date of birth</label>
              <div>
                <DatePicker
                  className="w-100"
                  value={
                    values.date_of_birth ? moment(values.date_of_birth) : null
                  }
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString)
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label>Gender</label>
              <div>
                <Select
                  style={{ width: "100%" }}
                  name="sex"
                  value={values.sex}
                  onChange={(value) => handleInputSelect("sex", value)}
                >
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </div>
            </div>
            <div>
              <label>Breed Type</label>
              <div>
                <Select
                  style={{ width: "100%" }}
                  name="breed_type"
                  value={values.breed_type}
                  onChange={(value) => handleInputSelect("breed_type", value)}
                >
                  {breedType.map((breed, index) => (
                    <Select.Option key={index} value={breed}>
                      {breed}
                    </Select.Option>
                  ))}
                </Select>
                {msgError.breed && (
                  <span className="error-message">{msgError.breed}</span>
                )}
              </div>
            </div>
            <div>
              <label>Color</label>
              <div>
                <Select
                  style={{ width: "100%" }}
                  name="color"
                  value={values.color}
                  onChange={(value) => handleInputSelect("color", value)}
                >
                  <Select.Option value={values.color} hidden>
                    {values.color}
                  </Select.Option>
                  {rabbitColor.map((color, index) => (
                    <Select.Option key={index} value={color}>
                      {color}
                    </Select.Option>
                  ))}
                </Select>
                {msgError.color && (
                  <span className="error-message">{msgError.color}</span>
                )}
              </div>
            </div>
            <div>
              <label>Rabbit Type</label>
              <div>
                <Select
                  style={{ width: "100%" }}
                  name="rabbit_type"
                  value={values.rabbit_type}
                  onChange={(value) => handleInputSelect("rabbit_type", value)}
                >
                  <Select.Option value="Pet rabbit">Pet rabbit</Select.Option>
                  <Select.Option value="Meat rabbit">Meat rabbit</Select.Option>
                </Select>
                {msgError.type && (
                  <span className="error-message">{msgError.type}</span>
                )}
              </div>
            </div>
            <div>
              <label>Weight</label>
              <div>
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  type="number"
                  step={0.1}
                  value={values.weight}
                  onChange={(value) => handleInputSelect("weight", value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="actions justify-content-end">
                <Button onClick={() => navigateTo("/rabbits")}>Cancel</Button>
                <Button type="primary" onClick={handleSubmit}>
                  Save
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
