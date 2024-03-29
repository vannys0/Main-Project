import React, { useState } from "react";
import "../Style.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { Input, DatePicker, Select, Button, Upload, InputNumber } from "antd";
import Swal from "sweetalert2";
import { breedType, rabbitColor } from "./API/RabbitApi";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function AddRabbit() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const navigateTo = useNavigate();
  const [file, setFile] = useState([]);
  const [img, setImg] = useState();
  const [imgError, setImgError] = useState(null);
  const [msgError, setMsgError] = useState({});
  const [values, setValues] = useState({
    name: "",
    dateOfBirth: "",
    sex: "",
    breed: "",
    color: "",
    type: "",
    weight: "",
  });
  const [selectedFiles, setSelectedFiles] = useState(null);

  const onFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    console.log(e.target.files);
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setImgError("");
  };

  const handleInputSelect = (name, value) => {
    setValues({ ...values, [name]: value });
    console.log(value);
  };

  const handleDateChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = {};
    if (selectedFiles === null) {
      setImgError("No selected file");
    }
    const errMessage = "This field is required";

    if (values.name === "") {
      validationError.name = errMessage;
    }
    if (values.dateOfBirth === "") {
      validationError.dateOfBirth = errMessage;
    }
    if (values.sex == "") {
      validationError.sex = errMessage;
    }
    if (values.breed === "") {
      validationError.breed = errMessage;
    }
    if (values.color === "") {
      validationError.color = errMessage;
    }
    if (values.type === "") {
      validationError.type = errMessage;
    }
    if (values.weight === "") {
      validationError.weight = errMessage;
    }

    setMsgError(validationError);

    if (Object.keys(validationError).length === 0) {
      let formData = new FormData();
      const postData = JSON.stringify(values);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
      formData.append("values", postData);

      try {
        const response = await axios.post(`${BASE_URL}/add-rabbit`, formData);
        navigateTo("/rabbits");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Add Rabbit</h3>
        <form className="form" encType="multipart/form-data">
          <div>
            <label>Picture :</label>
            <div>
              <input
                type="file"
                name="files"
                className="form-control"
                multiple
                accept="image/*"
                onChange={onFileChange}
              />
              {imgError && <span className="error-message">{imgError}</span>}
            </div>
          </div>
          <div>
            <label>Name :</label>
            <div>
              <Input
                name="name"
                style={{ fontFamily: "Poppins" }}
                onChange={handleInput}
                placeholder="Name"
              />
              {msgError.name && (
                <span className="error-message">{msgError.name}</span>
              )}
            </div>
          </div>
          <div>
            <label>Date of birth :</label>
            <div>
              <DatePicker
                className="w-100"
                name="dateOfBirth"
                onChange={(value) => handleDateChange("dateOfBirth", value)}
                placeholder="Date of Birth"
                required
              />
              {msgError.dateOfBirth && (
                <span className="error-message">{msgError.dateOfBirth}</span>
              )}
            </div>
          </div>
          <div>
            <label>Gender :</label>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Gender"
                onChange={(value) => handleInputSelect("sex", value)}
              >
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
              {msgError.sex && (
                <span className="error-message">{msgError.sex}</span>
              )}
            </div>
          </div>
          <div>
            <label>Breed Type :</label>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Breed"
                onChange={(value) => handleInputSelect("breed", value)}
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
            <label>Color :</label>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Color"
                onChange={(value) => handleInputSelect("color", value)}
              >
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
            <label>Rabbit Type :</label>
            <div>
              <Select
                style={{ width: "100%" }}
                placeholder="Type"
                onChange={(value) => handleInputSelect("type", value)}
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
            <label>Weight :</label>
            <div>
              <InputNumber
                style={{
                  width: "100%",
                }}
                min={1}
                type="number"
                step={0.1}
                placeholder="kilograms"
                onChange={(value) => handleInputSelect("weight", value)}
              />
              {msgError.weight && (
                <span className="error-message">{msgError.weight}</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="actions">
              <Button onClick={() => navigateTo("/rabbits")}>Cancel</Button>
              <Button type="primary" onClick={handleSubmit}>
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRabbit;
