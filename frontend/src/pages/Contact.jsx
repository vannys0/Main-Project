import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import Footer from "../components/footer.jsx";
import FarmImg from "../images/farm.jpg";
import { MdOutlineAttachEmail, MdOutlinePhoneForwarded } from "react-icons/md";
import { LiaFacebook } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";

function Contact() {
  return (
    <div className="main-div">
      <Navbar />
      <div className="contact-div">
        <div className="thumbnail">
          <h5>Send Us A Message</h5>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center gap-4 farm_img">
          <h4>Visit Us</h4>
          <h5 className="d-flex gap-2">
            <span>
              <IoLocationOutline className="icons" />
            </span>
            Concepcion, Libmanan, Camarines Sur
          </h5>
          <img src={FarmImg} alt="" />
        </div>
        <hr style={{ height: "2px solid black", width: "100%" }} />
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <h4>Email us at</h4>
          <h5 className="d-flex gap-2">
            <span>
              <MdOutlineAttachEmail className="icons" />
            </span>
            eleporidae@gmail.com
          </h5>
        </div>
        <hr style={{ height: "2px solid black", width: "100%" }} />
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <h4>Call us at</h4>

          <h5 className="d-flex gap-2">
            <span>
              <MdOutlinePhoneForwarded className="icons" />
            </span>
            09564758842
          </h5>
        </div>
        <hr style={{ height: "2px solid black", width: "100%" }} />
        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
          <h4>Social Media</h4>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="d-flex gap-2">
              <span>
                <LiaFacebook className="icons" />
              </span>
              Nogra Farm
            </h5>
            <h5 className="d-flex gap-2">
              <span>
                <IoMdLink className="icons" />
              </span>
              www.nografarm.facebook.com
            </h5>
          </div>
        </div>
        <hr style={{ height: "2px solid black", width: "100%" }} />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
