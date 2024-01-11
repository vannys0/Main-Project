import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import about from "../images/ab.jpg";
import contact from "../images/co.jpg";
import adopt from "../images/a.jpg";
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
        <div className="carousel">
          <Carousel>
            <Carousel.Item>
              <img src={about} alt="" className="w-100" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={contact} alt="" className="w-100" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={adopt} alt="" className="w-100" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="home-content">
          <h2>
            "Man is the only creature that consumes without producing. He does
            not give milk, he does not lay eggs, he is too weak to pull the
            plough, he cannot run fast enough to catch rabbits. Yet he is lord
            of all the animals."
          </h2>

          <h4>- George Orwell</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
