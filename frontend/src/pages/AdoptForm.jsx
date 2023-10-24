import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import SecureStore from "react-secure-storage";

function AdoptForm() {
  // const [currentDate, setCurrentDate] = useState("");
  const { id, name } = useParams();
  const navigateTo = useNavigate();
  const dateToday = new Date().toLocaleDateString();
  const user = SecureStore.getItem("userToken");
  const [file, setFile] = useState();
  const [img, setImg] = useState();

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // useEffect(() => {
  //   const today = new Date();
  //   const monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const month = monthNames[today.getMonth()];
  //   const formattedDate = `${month} ${today.getDate()}, ${today.getFullYear()}`;
  //   setCurrentDate(formattedDate);
  // }, []);

  const [values, setValues] = useState({
    id: uuidv4(),
    rabbit_id: id,
    date: dateToday,
    fullname: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    barangay: "",
    postalcode: "",
    reason: "",
    otherpets: "",
    user_id: user.id,
    transaction_status: "Pending",
    serviceoption: "",
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
      .post("http://localhost:8081/rabbitdata/" + id + "/adopt-form", formData)
      .then((res) => {
        console.log(res);
        navigateTo("/myapplication");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="form-div">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h4>Adopt {name}</h4>
          <br />
          <label htmlFor="fullname">
            Full Name <span className="errmsg">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            className="form-control"
            value={user.name}
            required
            onChange={handleInput}
          />
          <br />
          <label htmlFor="email">
            Email <span className="errmsg">*</span>
          </label>
          <input
            type="email"
            name="email"
            inputMode="email"
            className="form-control"
            value={user.email}
            required
            onChange={handleInput}
          />
          <br />
          <label htmlFor="phone">
            Phone <span className="errmsg">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            inputMode="tel"
            required
            onChange={handleInput}
          />
          <br />
          {/* <label htmlFor="date">
            Date <span className="errmsg">*</span>
          </label>
          <input
            type="date"
            name="date"
            inputMode="numeric"
            className="form-control"
            required
            onChange={handleInput}
          /> */}
          <label>
            Address <span className="errmsg">*</span>
          </label>
          <div className="address">
            <Form.Select
              aria-label="Default select example"
              onChange={handleInput}
              name="province"
              required
            >
              <option value="" hidden>
                Province
              </option>
              <option value="Camarines Sur">Camarines Sur</option>
            </Form.Select>
            <input
              type="text"
              name="city"
              placeholder="City/Municipality"
              className="form-control"
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="barangay"
              placeholder="Barangay"
              className="form-control"
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="postalcode"
              inputMode="numeric"
              placeholder="Postal code"
              className="form-control"
              onChange={handleInput}
              required
            />
          </div>
          <br />
          <hr />
          <br />

          <label htmlFor="serviceoption">
            Delivery Option <span className="errmsg">*</span>
          </label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="serviceoption"
            required
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Pick up">Pick up</option>
            <option value="Deliver">Deliver</option>
          </Form.Select>
          <br />

          <label htmlFor="environment">
            Home environment <span className="errmsg">*</span>
          </label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="image"
            onChange={onFileChange}
          />
          <br />
          <img src={file} className="w-50" />
          {/* {fileData()} */}

          <label htmlFor="reason">
            Reason for Adoption <span className="errmsg">*</span>
            <textarea
              name="reason"
              rows={2}
              cols={100}
              className="form-control"
              onChange={handleInput}
              required
            />
          </label>
          <br />
          <label htmlFor="otherpets">
            Other pets
            <textarea
              name="otherpets"
              rows={2}
              cols={100}
              className="form-control"
              onChange={handleInput}
              placeholder="If any"
            />
          </label>
          <Link to="/adopt" className="btn btn-secondary cancel">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdoptForm;
