import React, { useState } from "react";
import "../Style.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api"

function AddRabbit() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const navigate = useNavigate();

  const [file, setFile] = useState();
  const [img, setImg] = useState();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setImg(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const [values, setValues] = useState({
    id: uuidv4(),
    name: "",
    age: "",
    sex: "",
    weight: "",
  });

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", img);
    const postData = JSON.stringify(values);
    formData.append("values", postData);

    axios
      .post(BASE_URL + "/add-rabbit", formData)
      .then((res) => {
        toast.success("Successfully added!");
        navigate("/rabbits");
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
      <div className="main-container">
        <h3>ADD RABBIT</h3>
        <form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="">Image :</label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="image"
            onChange={onFileChange}
          />
          <br />
          <img src={file} style={{ width: "200px" }} />
          <br />
          <br />

          <label htmlFor="">Name :</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleInput}
            required
          />
          <br />
          <label htmlFor="">Age (month/s) :</label>
          <input
            type="number"
            name="age"
            className="form-control"
            onChange={handleInput}
            required
          />
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
          <br />
          <label htmlFor="">Weight (klg/s) :</label>
          <input
            type="text"
            name="weight"
            className="form-control"
            onChange={handleInput}
            required
          />
          <br />

          <div className="actions">
            <Link to="/rabbits" className="secondary text-decoration-none">
              Back
            </Link>
            <button className="primary">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRabbit;
