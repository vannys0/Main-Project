import React, { useEffect, useState } from "react";
import "../Style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Image, Button, Space, Input, QRCode, Avatar } from "antd";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; //e.g "http://localhost:8080/api"

function EditRabbit() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const { id } = useParams();
  const navigateTo = useNavigate();

  const [values, setValues] = useState([]);

  //QR
  const [value, setValue] = useState("{name: 'rabbit', age: 1}");
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);

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
      <div className="main-container">
        <h3>Edit rabbit</h3>
        <div className="edit-div">
          <Space align="center" direction="vertical">
            <Avatar
              style={{
                width: "350px",
                height: "350px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              shape="square"
              src={
                <Image
                  src={`http://localhost:8081/uploads/${values.image_path}`}
                  alt="avatar"
                />
              }
            />
          </Space>
          <form className="rabbit-form">
            <label htmlFor="">Name :</label>
            <input
              type="text"
              name="name"
              value={values.name}
              className="form-control"
              onChange={handleInput}
              required
            />
            <br />
            <label htmlFor="">Date of birth :</label>
            <input
              type="date"
              name="dateOfbirth"
              value={values.date_of_birth}
              className="form-control"
              onChange={handleInput}
              required
            />
            <br />
            <label htmlFor="">Sex :</label>
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
            <br />
            <label htmlFor="">Weight (klg/s) :</label>
            <input
              type="text"
              name="weight"
              value={values.weight}
              className="form-control"
              onChange={handleInput}
              required
            />
            <br />
            <div style={{ display: "flex", gap: "10px" }}>
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
          </form>
          <Space direction="vertical" align="center">
            <QRCode size={200} value={values.id} />
            <p>{values.id}</p>
            <Button type="primary">Download QR Code</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default EditRabbit;
