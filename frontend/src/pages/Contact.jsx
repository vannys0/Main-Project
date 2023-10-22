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
        <h2 className="send-us">Send us a message</h2>
        <br />
        <div>
          <h4>Email us at:</h4>
          <h2>eleporidae@gmail.com</h2>
        </div>
        <div>
          <h4>Call us at:</h4>
          <h2>+63 948 2048 756</h2>
        </div>
        <div>
          <h4>Write us on:</h4>
          <h2>Concepcion, Libmanan, Camarines Sur</h2>
        </div>
      </div>
      <Footer />
      <img src={Rabbit} alt="" className="rabbit-contact" />
    </div>
  );
}

export default Contact;
