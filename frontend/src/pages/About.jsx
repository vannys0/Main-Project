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
          <h4>Welcome to e-Leporidae</h4>
          <p>
            At e-Leporidae, we are driven by a simple but powerful mission: to
            provide a safe and loving environment for rabbits in need of
            rehoming. Our team is dedicated to promoting the well-being of these
            gentle creatures and ensuring that they find their forever homes.
          </p>
          <h4>Our goal</h4>
          <p>
            <span>Educate rabbit owners on responsible care.</span>
            <br />
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
          <p>
            <span>Create a supportive rabbit-loving community.</span>
            <br />
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
      </div>
      <Footer />
    </div>
  );
}

export default About;
