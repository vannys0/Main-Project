import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import Footer from "../components/footer.jsx";
import contact from "../images/co.jpg";
import { RiMailSendLine } from "react-icons/ri";
import { MdOutlineAttachEmail, MdOutlinePhoneForwarded } from "react-icons/md";
import { LiaFacebook } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Contact() {
  const [values, setValues] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const onChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const onSendEmail = () => {
    const { email, subject, message } = values;

    axios
      .post(`${BASE_URL}/send_us_message`, { email, subject, message })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-div">
      <Navbar />
      <img src={contact} alt="no image" loading="lazy" />
      <div className="contact-div bg-light">
        <div className="contact-details">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-success">
              <IoLocationOutline />
            </button>
            <span>
              Brgy. Concepcion, Libmanan, Camarines Sur 4407
              <br />
              Philippines
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-success">
              <LiaFacebook />
            </button>
            <span> www.nografarm.facebook.com</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-success">
              <MdOutlinePhoneForwarded />
            </button>
            <span>+63 956 475 8842</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-success">
              <MdOutlineAttachEmail />
            </button>
            <span>eleporidae@gmail.com</span>
          </div>
        </div>
        <form className="d-flex flex-column p-4">
          <h5>LEAVE US A MESSAGE</h5>
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="subject"
            onChange={onChange}
            placeholder="Subject"
            required
          />
          <textarea
            rows="5"
            name="message"
            onChange={onChange}
            placeholder="Message"
            required
          ></textarea>
          <button className="btn btn-success" onClick={onSendEmail}>
            Send
            <span>
              <RiMailSendLine />
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
