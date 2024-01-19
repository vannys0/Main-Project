import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button, Modal } from "antd";
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";
import {
  getAllProvince,
  getAllCityByProvinceCode,
  getAllBarangayByCityCodeList,
} from "./Api/camarinessur";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function AdoptForm({ data }) {
  const user = SecureStore.getItem("userToken");
  const USER_NAME = user.name;
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState({});
  const [prov, setProv] = useState([]);
  const [citymunOptions, setCitymunOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [file, setFile] = useState();
  const [img, setImg] = useState();
  const [mopAgriculture, setmopAgriculture] = useState(false);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  function formatAsDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const currentDate = new Date();
  const dateToday = formatAsDate(currentDate);
  const [msgError, setMsgError] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    getAllProvince((data) => {
      setProv(data);
    });
  }, []);
  const handleProvinceChange = (e) => {
    setValues((prev) => ({ ...prev, province: selectedProvCode }));
    const selectedProvCode = JSON.parse(e.target.value);
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
    console.log(selectedCitymunCode);
    if (selectedCitymunCode) {
      getAllBarangayByCityCodeList(selectedCitymunCode, (data) => {
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
    user_name: user.name,
    user_email: user.email,
    rabbit_id: data.id,
    date: dateToday,
    phone: "",
    province: "",
    city: "",
    barangay: "",
    reason: "",
    otherpets: "",
    user_id: user.id,
    adoption_status: "Pending",
    serviceoption: "",
    mop: "",
    price: data.price,
    agprod: null,
    agprodprice: 0,
  });

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const modeOfPaymentSelection = (e) => {
    values.agprod = "";
    values.agprodprice = 0;

    setValues((prev) => ({ ...prev, mop: selected }));
    const selected = e.target.value;
    console.log(selected);
    setmopAgriculture(selected === "Agriculture" ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = {};
    const errMessage = "This field is required";

    if (!img) {
      validationError.image = "No file choosen";
    }
    if (values.phone === "") {
      validationError.phone = errMessage;
    } else if (values.phone < 0) {
      validationError.phone = "Invalid phone number";
    }
    if (values.province === "") {
      validationError.province = errMessage;
    }
    if (values.city === "") {
      validationError.city = errMessage;
    }
    if (values.barangay === "") {
      validationError.barangay = errMessage;
    }
    if (values.mop === "") {
      validationError.mop = errMessage;
    }
    if (values.serviceoption === "") {
      validationError.serviceoption = errMessage;
    }
    if (values.reason === "") {
      validationError.reason = errMessage;
    }

    setMsgError(validationError);

    if (Object.keys(validationError).length === 0) {
      const formData = new FormData();
      formData.append("image", img);
      const postData = JSON.stringify(values);
      formData.append("values", postData);

      console.log(errors);

      await axios
        .post(`${BASE_URL}/rabbitdata/${data.id}/adopt-form`, formData)
        .then((res) => {
          console.log(res);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Sent",
            showConfirmButton: false,
            timer: 1500,
          });
          navigateTo("/myapplication");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Adopt
      </Button>
      <Modal
        width={600}
        style={{ top: 20 }}
        title="Adoption Form"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="apply" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <form encType="multipart/form-data">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            name="phone"
            maxLength={11}
            className="form-control"
            inputMode="tel"
            onChange={handleInput}
          />
          {msgError.phone && <span className="error">{msgError.phone}</span>}
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
                    {capitalizeFirstLetter(option.provDesc)}
                  </option>
                ))}
              </Form.Select>
              {msgError.province && (
                <span className="error">{msgError.province}</span>
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
                    {capitalizeFirstLetter(option.citymunDesc)}
                  </option>
                ))}
              </Form.Select>
              {msgError.city && <span className="error">{msgError.city}</span>}
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
                    {capitalizeFirstLetter(option.brgyDesc)}
                  </option>
                ))}
              </Form.Select>
              {msgError.barangay && (
                <span className="error">{msgError.barangay}</span>
              )}
            </div>
          </div>
          <br />
          <hr />
          <br />

          <label htmlFor="serviceoption">Delivery Options</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="serviceoption"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Pick up">Pick Up</option>
            <option value="Deliver">Deliver</option>
          </Form.Select>
          {msgError.serviceoption && (
            <span className="error">{msgError.serviceoption}</span>
          )}
          <br />

          <label htmlFor="serviceoption">Modes of Payment</label>
          <Form.Select
            aria-label="Default select example"
            onChange={modeOfPaymentSelection}
            name="serviceoption"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Cash">
              Cash <em>(Optional)</em>
            </option>
            <option value="Agriculture">Agriculture</option>
          </Form.Select>
          {msgError.mop && <span className="error">{msgError.mop}</span>}
          {mopAgriculture && (
            <div>
              <br />
              <label htmlFor="agprod" className="label-name">
                Agricultural Product <em>(Please specify)</em>
              </label>
              <input
                type="text"
                name="agprod"
                className="form-control"
                onChange={handleInput}
              />
              <br />
              <label htmlFor="agprodprice" className="label-name">
                Product Estimated Amount <em>(PHP)</em>
              </label>
              <input
                type="number"
                name="agprodprice"
                className="form-control"
                onChange={handleInput}
              />
            </div>
          )}
          <br />

          <label htmlFor="environment">Home Environment</label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="image"
            accept=".jpeg, .jpg, .png"
            onChange={onFileChange}
          />
          {msgError.image && <span className="error">{msgError.image}</span>}
          <br />
          <label htmlFor="reason">Reason For Adoption</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="reason"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Rabbits live a long time">
              Rabbits live a long time
            </option>
            <option value="Rabbits are a great pet">
              Rabbits are a great pets
            </option>
            <option value="Rabbits are inexpensive">
              Rabbits are inexpensive
            </option>
            <option value="Quiet and gentle nature">
              Quiet and gentle nature
            </option>
            <option value="Adaptability to indoor living">
              Adaptability to indoor living
            </option>
            <option value="Other">Others</option>
          </Form.Select>
          {msgError.reason && <span className="error">{msgError.reason}</span>}
          <br />
          <label htmlFor="otherpets">
            Other Pets <i>(Optional)</i>
          </label>
          <textarea
            name="otherpets"
            rows={2}
            cols={100}
            className="form-control"
            onChange={handleInput}
          />
        </form>
      </Modal>
    </div>
  );
}

export default AdoptForm;
