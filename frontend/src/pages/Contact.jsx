import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import Rabbit from "../images/rabbit-contact.png";
import Footer from "../components/footer.jsx";

function Contact() {
  return (
    <div className="main-div">
      <Navbar />
      <div className="contact-div">
        <h2>Send us a message</h2>
        <br />
        <div>
          <p>
            Want to get in touch with us? Make an offer now! <br /> Here are the
            details.
          </p>
        </div>
        <div>
          <p>Email us at:</p>
          <h4>eleporidae@gmail.com</h4>
        </div>
        <div>
          <p>Call us at:</p>
          <h4>09564758842</h4>
        </div>
        <div>
          <p>Write us on:</p>
          <h4>Concepcion, Libmanan, Camarines Sur</h4>
        </div>
      </div>
      <Footer />
      <img src={Rabbit} alt="" className="rabbit-contact" />
    </div>
  );
}

export default Contact;
