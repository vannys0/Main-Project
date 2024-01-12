import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";
import carousel4 from "../images/carousel4.jpg";
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
              <img src={carousel1} alt="" className="w-100" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={carousel2} alt="" className="w-100" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={carousel3} alt="" className="w-100" />
            </Carousel.Item>
            <Carousel.Item>
              <img src={carousel4} alt="" className="w-100" />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="home-content">
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <h2>
              "It's a small thing to help animal, but to that one animal it's a
              big thing."
            </h2>
            <h4>- Gene Baur</h4>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <h2>
              "Love the animals: God has given them the rudiments of thought and
              joy untroubled."
            </h2>
            <h4>- Fyodor Dostoevsky</h4>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
