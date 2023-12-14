import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";
import "./style.css";
import { Avatar, Image, Button } from "antd";
import { Carousel } from "react-bootstrap";

function RabbitData() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { state } = location;
  const data = state && state.data;

  return (
    <div className="main-div">
      <Navbar />
      <div className="rabbit-data-div">
        <div className="thumbnail">
          <h5>Rabbit Details</h5>
        </div>
        {data && (
          <div className="rabbit-container">
            <div className="rabbit-info">
              <Carousel>
                {data.image_path.split(",").map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={`http://localhost:8081/uploads/${image.trim()}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <div className="rabbit_details">
                <h4>
                  Hi, my name is {data.name} and I am looking for a new home.
                </h4>
                <div>
                  <h6>Rabbit Id</h6>
                  <h6>{data.id}</h6>
                </div>
                <div>
                  <h6>Name</h6>
                  <h6>{data.name}</h6>
                </div>
                <div>
                  <h6>Sex</h6>
                  <h6>{data.sex}</h6>
                </div>
                <div>
                  <h6>Breed</h6>
                  <h6>{data.breed_type}</h6>
                </div>
                <div>
                  <h6>Age</h6>
                  <h6>Age</h6>
                </div>
                <div>
                  <h6>Color</h6>
                  <h6>{data.color}</h6>
                </div>
                <div>
                  <h6>Weight</h6>
                  <h6>{data.weight} klg</h6>
                </div>
                <div>
                  <h6>Rabbit Type</h6>
                  <h6>{data.rabbit_type}</h6>
                </div>
                <div>
                  <h6>Adoption Fee</h6>
                  <h6>{data.price}</h6>
                </div>
              </div>
            </div>
            <Button
              className="w-100 mt-4"
              type="primary"
              onClick={() =>
                navigateTo(
                  `/rabbitdata/${JSON.stringify(data)}/${data.id}/adopt-form`
                )
              }
            >
              Apply for Adoption
            </Button>
          </div>

          // <div className="d-flex flex-column gap-4">
          // <Carousel
          //   style={{
          //     width: "50%",
          //     display: "flex",
          //     alignItems: "center",
          //     justifyContent: "center",
          //   }}
          // >
          //   {data.image_path.split(",").map((image, index) => (
          //     <Carousel.Item
          //       style={{
          //         display: "flex",
          //         alignItems: "center",
          //         justifyContent: "center",
          //       }}
          //       key={index}
          //     >
          //       <Avatar
          //         style={{
          //           display: "flex",
          //           alignItems: "center",
          //           justifyContent: "center",
          //         }}
          //         shape="square"
          //         size={300}
          //         src={
          //           <Image
          //             src={`http://localhost:8081/uploads/${image.trim()}`}
          //           />
          //         }
          //       />
          //     </Carousel.Item>
          //   ))}
          // </Carousel>

          //   <div className="data_div">
          // <div>
          //   <h6>Rabbit Id</h6>
          //   <h6>{data.id}</h6>
          // </div>
          // <div>
          //   <h6>Name</h6>
          //   <h6>{data.name}</h6>
          // </div>
          // <div>
          //   <h6>Sex</h6>
          //   <h6>{data.sex}</h6>
          // </div>
          // <div>
          //   <h6>Breed</h6>
          //   <h6>{data.breed_type}</h6>
          // </div>
          // <div>
          //   <h6>Age</h6>
          //   <h6>Age</h6>
          // </div>
          // <div>
          //   <h6>Color</h6>
          //   <h6>{data.color}</h6>
          // </div>
          // <div>
          //   <h6>Weight</h6>
          //   <h6>{data.weight} klg</h6>
          // </div>
          // <div>
          //   <h6>Rabbit Type</h6>
          //   <h6>{data.rabbit_type}</h6>
          // </div>
          // <div>
          //   <h6>Adoption Fee</h6>
          //   <h6>{data.price}</h6>
          // </div>
          //   </div>
          // </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default RabbitData;
