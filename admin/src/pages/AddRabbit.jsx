import React, { useState } from "react";
import "../Style.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Select, Button } from "antd";
import Swal from "sweetalert2";
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = {};
    // if (!img) {
    //   setImgError("No selected file");
    //   return;
    // }
    if (!values.name.trim()) {
      validationError.name = "Field is required";
    }
    if (!values.dateOfBirth.trim()) {
      validationError.dateOfBirth = "Field is required";
    }
    if (!values.sex.trim()) {
      validationError.sex = "Field is required";
    }
    if (!values.weight.trim()) {
      validationError.weight = "Field is required";
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
      <div className="main-container">
        <h3>Add rabbit</h3>
        <form className="form" encType="multipart/form-data">
          <label htmlFor="">Image :</label>
          <input
            type="file"
            name="files"
            className="form-control"
            multiple
            accept="image/*"
            onChange={onFileChange}
          />
          <img style={{ width: "100px" }} src={file} alt="" />
          {/* {imgError && <span className="error-message">{imgError}</span>} */}
          <br />

          <label htmlFor="">Name :</label>
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
          <br />
          <label htmlFor="">Date of birth :</label>
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
          <br />
          <label htmlFor="sex">Sex :</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="sex"
            required
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
          {msgError.sex && (
            <span className="error-message">{msgError.sex}</span>
          )}
          <br />
          <label htmlFor="sex">By-Product :</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="byproduct"
            required
          >
            <option value="" hidden>
              Select
            </option>
            <option value="For Meat">For Meat</option>
            <option value="Other">Other</option>
          </Form.Select>

          <br />
          <label htmlFor="">Weight (klg/s) :</label>
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
          <br />

          <div className="actions justify-content-end">
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
        </form>
      </div>
    </div>
  );
}

export default AddRabbit;
