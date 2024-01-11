import React from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import about from "../images/ab.jpg";
import Footer from "../components/footer.jsx";

function About() {
  return (
    <div className="main-div">
      <Navbar />
      <div className="about-div bg-light">
        <img src={about} alt="no image" loading="lazy" />
        <div>
          <h4>ABOUT US</h4>
          <p className="justify">
            Welcome to e-Leporidae, where our passion for the well-being of
            rabbits drives a simple yet powerful mission.
            <br />
            <br />
            Committed to creatE a safe and loving environment for rabbits in
            need of rehoming. At e-Leporidae, our dedicated team works
            tirelessly to promote the welfare of these gentle creatures,
            ensuring that each one finds its forever home. We are fueled by a
            deep love and respect for rabbits, and we believe that every bunny
            deserves a happy and fulfilling life.
            <br />
            <br />
            Whether you're a fellow enthusiast, a potential adopter, or someone
            seeking to support our cause, we invite you to join us in making a
            positive impact on the lives of these adorable and often
            misunderstood animals.
          </p>
          <h4>CORE OBJECTIVES</h4>
          <p>
            <span>Educate rabbit owners on responsible care.</span>
            <br />
            <br />
            At e-Leporidae, our focus is on equipping rabbit owners with the
            information and guidance needed to responsibly care for their
            cherished companions. This encompasses essential aspects such as
            nutrition, habitat setup, exercise routines, and health maintenance.
            Our mission involves offering educational resources and expert
            advice to empower rabbit owners, enabling them to understand and
            meet their pets' specific needs. Responsible care extends from
            providing a well-balanced diet to creating a secure and stimulating
            environment. Routine veterinary care is also emphasized to prevent
            and address potential health issues. Ultimately, we aim to cultivate
            a community of informed and responsible rabbit owners dedicated to
            providing their furry friends with the highest possible quality of
            life.
          </p>
          <p>
            <span>Create a supportive rabbit-loving community.</span>
            <br />
            <br />
            Our specific aim is to cultivate a community that serves as a
            valuable resource for both seasoned rabbit owners and those new to
            rabbit care. Through online forums, local meet-ups, and educational
            events, we strive to build a network of like-minded individuals who
            can provide guidance, share experiences, and advocate for the
            well-being of rabbits.
            <br />
            <br />
            At e-Leporidae, our vision is to unite rabbit lovers in a supportive
            and caring community dedicated to enhancing the lives of these
            endearing animals.
            <br />
            <br />
            Join us on this journey, and let's create a space where our shared
            passion for rabbits flourishes.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
