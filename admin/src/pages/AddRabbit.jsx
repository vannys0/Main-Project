import React, { useState } from "react";
import "../Style.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Select, Button } from "antd";
import { breedType, rabbitColor } from "./API/RabbitApi";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api"

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
    id: uuidv4(),
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
    // setImg(e.target.files);
    // setFile(URL.createObjectURL(file.Array.map()));
    // setImgError(null);
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};
    if (!file) {
      setImgError("No selected file");
      return;
    }
    const errMessage = "This field is required";

    if (!values.name.trim()) {
      validationError.name = errMessage;
    }
    if (!values.dateOfBirth.trim()) {
      validationError.dateOfBirth = errMessage;
    }
    if (!values.sex.trim()) {
      validationError.sex = errMessage;
    }
    if (!values.breed.trim()) {
      validationError.breed = errMessage;
    }
    if (!values.color.trim()) {
      validationError.color = errMessage;
    }
    if (!values.type.trim()) {
      validationError.type = errMessage;
    }
    if (!values.weight.trim()) {
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
        <form className="form" encType="multipart/form-data">
          <div>
            <h6>Picture :</h6>
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
            <h6>Name :</h6>
            <div>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleInput}
                required
              />
              {msgError.name && (
                <span className="error-message">{msgError.name}</span>
              )}
            </div>
          </div>
          <div>
            <h6>Date of birth :</h6>
            <div>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                onChange={handleInput}
                required
              />
              {msgError.dateOfBirth && (
                <span className="error-message">{msgError.dateOfBirth}</span>
              )}
            </div>
          </div>
          <div>
            <h6>Sex :</h6>
            <div>
              <Form.Select
                aria-label="Default select example"
                onChange={handleInput}
                name="sex"
                required
              >
                <option value="" hidden></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              {msgError.sex && (
                <span className="error-message">{msgError.sex}</span>
              )}
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
                <option value="" hidden></option>
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
                <option value="" hidden></option>
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
                <option value="" hidden></option>
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
                className="form-control"
                onChange={handleInput}
                required
              />
              {msgError.weight && (
                <span className="error-message">{msgError.weight}</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="actions">
              <Button
                type="primary"
                danger
                onClick={() => navigateTo("/rabbits")}
              >
                Cancel
              </Button>
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
