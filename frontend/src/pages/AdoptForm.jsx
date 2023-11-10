import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Button } from "antd";
import Validation from "./Validation/AdoptFormValidation";
import SecureStore from "react-secure-storage";
import {
  getAllProvince,
  getAllCityByProvinceCode,
  getAllBarangayByCityCodeList,
} from "./Api/camarinessur";

function AdoptForm() {
  const { id, name } = useParams();
  const navigateTo = useNavigate();
  const user = SecureStore.getItem("userToken");
  const [errors, setErrors] = useState({});
  const [prov, setProv] = useState([]);
  const [citymunOptions, setCitymunOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [file, setFile] = useState();
  const [img, setImg] = useState();

  function formatAsDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const currentDate = new Date();
  const dateToday = formatAsDate(currentDate);
  console.log(dateToday);

  useEffect(() => {
    getAllProvince((data) => {
      setProv(data);
    });

    // getAllCityByProvinceCodeList((data) => {
    //   setCitymunOptions(data);
    // });
  }, []);

  const handleProvinceChange = (e) => {
    setValues((prev) => ({ ...prev, province: selectedProvCode }));
    const selectedProvCode = JSON.parse(e.target.value); //object
    console.log(selectedProvCode);

    if (selectedProvCode) {
      getAllCityByProvinceCode(selectedProvCode.provCode, (data) => {
        setCitymunOptions(data);
      });
    } else {
      setCitymunOptions([]);
    }
  };

  const handleCityChange = (e) => {
    setValues((prev) => ({ ...prev, city: selectedCitymunCode }));
    const selectedCitymunCode = JSON.parse(e.target.value);
    if (selectedCitymunCode) {
      getAllBarangayByCityCodeList(selectedCitymunCode.citymunCode, (data) => {
        setBrgyOptions(data);
      });
    } else {
      setBrgyOptions([]);
    }
  };

  const onFileChange = (e) => {
    setImg(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const [values, setValues] = useState({
    id: uuidv4(),
    rabbit_id: id,
    date: dateToday,
    fullname: user.name,
    email: user.email,
    phone: "",
    province: "",
    city: "",
    barangay: "",
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
    setErrors(Validation(values));

    const formData = new FormData();
    formData.append("image", img);
    const postData = JSON.stringify(values);
    formData.append("values", postData);

    // if (
    //   errors.email === "" &&
    //   errors.name === "" &&
    //   errors.phone === "" &&
    //   errors.reason === ""
    // ) {
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
        <form encType="multipart/form-data">
          <h4>Adopt {name}</h4>
          <br />
          <label htmlFor="fullname" className="label-name">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            className="form-control"
            value={user.name}
            onChange={handleInput}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            inputMode="email"
            className="form-control"
            value={user.email}
            onChange={handleInput}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            maxLength={11}
            className="form-control"
            inputMode="tel"
            onChange={handleInput}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <br />
          <label>Address</label>
          <div className="address">
            <div>
              <Form.Select
                aria-label="Default select example"
                onChange={handleProvinceChange}
                name="province"
              >
                <option value="" hidden>
                  Province
                </option>
                {prov.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.provDesc}
                  </option>
                ))}
              </Form.Select>
              {errors.province && (
                <span className="error">{errors.province}</span>
              )}
            </div>
            <div>
              <Form.Select
                name="city"
                className="form-control"
                onChange={handleCityChange}
              >
                <option value="" hidden>
                  City
                </option>
                {citymunOptions.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.citymunDesc}
                  </option>
                ))}
              </Form.Select>
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div>
              <Form.Select
                name="barangay"
                className="form-control"
                onChange={handleInput}
              >
                <option value="" hidden>
                  Barangay
                </option>
                {brgyOptions.map((option) => (
                  <option key={option.id} value={option.brgyDesc}>
                    {option.brgyDesc}
                  </option>
                ))}
              </Form.Select>
              {errors.barangay && (
                <span className="error">{errors.barangay}</span>
              )}
            </div>
          </div>
          <br />
          <hr />
          <br />

          <label htmlFor="serviceoption">Delivery Option</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="serviceoption"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Pick up">Pick up</option>
            <option value="Deliver">Deliver</option>
          </Form.Select>
          {errors.serviceoption && (
            <span className="error">{errors.serviceoption}</span>
          )}
          <br />

          <label htmlFor="environment">Home environment</label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="image"
            accept=".jpeg, .jpg, .png"
            onChange={onFileChange}
          />
          <br />
          <label htmlFor="reason">Reason for Adoption</label>
          <textarea
            name="reason"
            rows={2}
            cols={100}
            className="form-control"
            onChange={handleInput}
            required
          />
          {errors.reason && <span className="error">{errors.reason}</span>}

          <br />
          <label htmlFor="otherpets">Other pets</label>
          <textarea
            name="otherpets"
            rows={2}
            cols={100}
            className="form-control"
            onChange={handleInput}
            placeholder="Optional"
          />

          <div className="d-flex justify-content-end gap-2 my-4">
            <Button type="primary" danger onClick={() => navigateTo("/adopt")}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              Apply
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdoptForm;
