import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button, Modal } from "antd";
import Swal from "sweetalert2";
import Validation from "./Validation/AdoptFormValidation";
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
  const { name, id } = useParams();
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState({});
  const [prov, setProv] = useState([]);
  const [citymunOptions, setCitymunOptions] = useState([]);
  const [brgyOptions, setBrgyOptions] = useState([]);
  const [file, setFile] = useState();
  const [img, setImg] = useState();
  const [mopAgriculture, setmopAgriculture] = useState(false);

  function formatAsDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  const currentDate = new Date();
  const dateToday = formatAsDate(currentDate);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

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
    // Access to backend only
    user_name: user.name,
    user_email: user.email,
    // End
    rabbit_id: id,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    const formData = new FormData();
    formData.append("image", img);
    const postData = JSON.stringify(values);
    formData.append("values", postData);

    console.log(errors);

    axios
      .post(`${BASE_URL}/rabbitdata/${id}/adopt-form`, formData)
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
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Apply for adoption
      </Button>
      <Modal
        style={{ top: 20 }}
        title="Adoption Form"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="apply" type="primary" onClick={handleSubmit}>
            Apply
          </Button>,
        ]}
      >
        <form encType="multipart/form-data">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            maxLength={11}
            className="form-control"
            inputMode="tel"
            onChange={handleInput}
          />
          {errors.phone != "" && <span className="error">{errors.phone}</span>}
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

          <label htmlFor="serviceoption">Modes of Payment</label>
          <Form.Select
            aria-label="Default select example"
            onChange={modeOfPaymentSelection}
            name="serviceoption"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Cash">Cash</option>
            <option value="Agriculture">Agriculture</option>
          </Form.Select>
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
                Product estimated amount <em>(Php)</em>
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
          <label htmlFor="reason">Why choose a rabbit?</label>
          <Form.Select
            aria-label="Default select example"
            onChange={handleInput}
            name="reason"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="Quiet and gentle nature">
              Quiet and gentle nature
            </option>
            <option value="Rabbits are inexpensive">
              Rabbits are inexpensive
            </option>
            <option value="Rabbits are a great pet">
              Rabbits are a great pet
            </option>
            <option value="Rabbits live a long time">
              Rabbits live a long time
            </option>
            <option value="Adaptability to indoor living">
              Adaptability to indoor living
            </option>
            <option value="Other">Other</option>
          </Form.Select>
          {errors.reason && <span className="error">{errors.reason}</span>}

          <br />
          <label htmlFor="otherpets">
            Other pets <em>(Optional)</em>
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
