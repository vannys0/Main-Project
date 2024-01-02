import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import about from "../images/about.jpg";
import contact from "../images/contact.jpg";
import adopt from "../images/adopt.jpg";
import Carousel from "react-bootstrap/Carousel";
import Footer from "../components/footer.jsx";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import SecureStore from "react-secure-storage";

function Home() {
  const user = SecureStore.getItem("userToken");
  const navigateTo = useNavigate();
  return (
    <div className="main-div bg-light">
      <Navbar />
      <div className="home-div">
        <Carousel>
          <Carousel.Item>
            <Image src={about} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={contact} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={adopt} alt="" />
          </Carousel.Item>
        </Carousel>
        <div className="home-content">
          <h3>WELCOME TO ELEPORIDAE</h3>
          <div className="w-100 d-flex justify-content-between">
            <h3>
              Creating a better future <br /> for all rabbits.
            </h3>
            <button className="adopt-btn" onClick={() => navigateTo("/adopt")}>
              Adopt Now!
            </button>
          </div>
          <p>
            &emsp; &emsp; ELeporidae's primary objective is to pave the way for
            a brighter future for rabbits. At the core of our mission is a deep
            commitment to the well-being and welfare of these beloved animals.
            We strive to create a world where rabbits can thrive in safe and
            nurturing environments, championing their health, happiness, and
            quality of life. Our unwavering dedication to these furry companions
            underscores our determination to ensure a better tomorrow for them
            in every possible way.
          </p>
          <p>
            Have questions or need help? Email us at
            <span className="email"> eleporidae@gmail.com</span> and we'll be
            happy to talk more with you!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
