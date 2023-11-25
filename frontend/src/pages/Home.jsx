import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import RabbitHome from "../images/rabbit-home1.jpg";
import Img1 from "../images/riceFarm.jpg";
import Img2 from "../images/santol.jpg";
import Img3 from "../images/banana.jpg";
import Footer from "../components/footer.jsx";
import { Link } from "react-router-dom";
import SecureStore from "react-secure-storage";

function Home() {
  const user = SecureStore.getItem("userToken");
  return (
    <div className="main-div">
      <Navbar />
      <div className="home-div">
        <h1 className="align-self-center">Welcome to e-Leporidae!</h1>
        <br />
        <img src={RabbitHome} alt="" />
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <h2>
            Creating a better future <br /> for all rabbits.
          </h2>
          <Link to="/adopt" className="adoptbtn">
            Adopt rabbit now!
          </Link>
        </div>
        <br />
        <p>
          E-Leporidae's primary objective is to pave the way for a brighter
          future for rabbits. At the core of our mission is a deep commitment to
          the well-being and welfare of these beloved animals. We strive to
          create a world where rabbits can thrive in safe and nurturing
          environments, championing their health, happiness, and quality of
          life. Our unwavering dedication to these furry companions underscores
          our determination to ensure a better tomorrow for them in every
          possible way.
        </p>
        <h4 className="related-business">Related Businessess:</h4>
        <div className="home-body">
          <div>
            <h5>Santol Plants</h5>
            <img src={Img2} alt="" />
          </div>
          <div>
            <h5>Banana Plants</h5>
            <img src={Img3} alt="" />
          </div>
        </div>
        <br />
        <div className="d-flex align-items-center justify-content-center last-div">
          <h5>Rice Farming</h5>
          <img src={Img1} alt="" />
        </div>
        <div className="my-4">
          <h5>
            Have questions or need help? Email us at
            <span className="email"> eleporidae@gmail.com</span> and we'll be
            happy to talk more with you!
          </h5>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
