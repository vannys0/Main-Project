import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import Footer from "../components/footer.jsx";

function About() {
  return (
    <div className="main-div">
      <Navbar />
      <div className="about-div">
        <div className="thumbnail">
          <h5>About Us</h5>
        </div>
        <div className="content">
          <p>
            At e-Leporidae, we are driven by a simple but powerful mission: to{" "}
            <br />
            provide a safe and loving environment for rabbits in need of
            rehoming. <br />
            Our team is dedicated to promoting the well-being of these gentle{" "}
            <br />
            creatures and ensuring that they find their forever homes.
          </p>
        </div>
        <div className="content">
          <h4>Our Goal</h4>

          <h5>Find a happy home for rabbits.</h5>
          <p>
            The goal is to secure a contented and suitable residence for
            rabbits. This entails locating environments where these animals can
            live comfortably, free from harm, and with access to their physical
            and emotional needs. The primary objective is to match rabbits with
            loving families or caregivers who can provide them with proper care
            and a nurturing atmosphere. By finding happy homes for rabbits, we
            aim to ensure that they can experience a life filled with joy,
            companionship, and the security they deserve. This involves not only
            identifying appropriate living spaces but also educating potential
            owners on how to create a harmonious and enriching habitat for their
            rabbit companions.
          </p>
          <h5>Educate rabbit owners on responsible care.</h5>
          <p>
            The core objective here is to inform and guide rabbit owners in the
            practice of responsible care for these beloved pets. This
            encompasses a range of critical aspects, such as nutrition, habitat,
            exercise, and health maintenance. By providing educational resources
            and advice, we aim to empower rabbit owners with the knowledge and
            tools necessary to ensure their pets lead healthy, happy lives.
            Responsible care entails understanding a rabbit's specific needs,
            from providing a balanced diet to creating a safe and stimulating
            environment. It also involves routine veterinary care to prevent and
            address health issues. Ultimately, our mission is to foster a
            community of informed and responsible rabbit owners who can offer
            their furry companions the best possible quality of life.
          </p>
          <h5>Create a supportive rabbit-loving community.</h5>
          <p>
            Our primary aim is to establish a nurturing and inclusive community
            of individuals who share a profound love for rabbits. We believe
            that by coming together, we can create an environment where rabbit
            enthusiasts can connect, exchange knowledge, and offer mutual
            support. This community will serve as a valuable resource for both
            seasoned rabbit owners and those new to rabbit care, fostering a
            sense of belonging and a shared passion for these wonderful
            creatures. Whether it's through online forums, local meet-ups, or
            educational events, we aim to build a network of like-minded
            individuals who can provide guidance, share experiences, and
            advocate for the well-being of rabbits. Our vision is to unite
            rabbit lovers in a supportive and caring community dedicated to
            enhancing the lives of these endearing animals.
          </p>
        </div>
        <div className="content">
          <h4 className="visit-us">Visit Us</h4>

          <h5>Visit our farm at:</h5>
          <h5>Concepcion, Libmanan, Camarines Sur, Philippines</h5>
          <p>Look for Mr. Leonardo Nogra</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
