import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { Button, Avatar } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function BreedPair() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [scanResult, setScanResult] = useState();
  const [scanResult1, setScanResult1] = useState();
  const [rabbit, setRabbit] = useState(null);
  const [rabbit1, setRabbit1] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      axios
        .get(`${BASE_URL}/get_sex?id=${result}`)
        .then((res) => {
          setRabbit(res.data[0]);
          const scannedSex = res.data[0].sex;
          if (scannedSex === "Male") {
            setScanResult(result);
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid Rabbit",
              text: "Please scan a male rabbit at this reader.",
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.timer
              ) {
                window.location.reload();
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    const scanner1 = new Html5QrcodeScanner("reader1", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner1.render(success, error);

    function success(result) {
      scanner1.clear();
      axios
        .get(`${BASE_URL}/get_sex?id=${result}`)
        .then((res) => {
          setRabbit1(res.data[0]);
          const scannedSex = res.data[0].sex;
          if (scannedSex === "Female") {
            setScanResult1(result);
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid Rabbit",
              text: "Please scan a female rabbit at this reader.",
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.timer
              ) {
                window.location.reload();
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const onPair = () => {
    if (!scanResult && !scanResult1) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Oops...",
        text: "No QR code has been scanned",
      });
      return;
    }

    if (scanResult === scanResult1) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Scanned codes must be different for pairing.",
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          window.location.reload();
        }
      });
      return;
    }

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 32);

    Swal.fire({
      title: "Confirm?",
      text: "Add a note to this pair",
      input: "text",
      inputPlaceholder: "Add a note",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#797979",
      confirmButtonText: "Confirm",
      preConfirm: (note) => {
        if (!note) {
          Swal.showValidationMessage("Note cannot be empty");
        }
        return note;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(BASE_URL + "/pair-rabbit", {
            male_rabbit_id: scanResult,
            female_rabbit_id: scanResult1,
            note: result.value,
            date: currentDate.toISOString(),
            expected_due: futureDate.toISOString(),
          })
          .then((res) => {
            if (res.data === "Pair already exists") {
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: "This rabbits are already exists in the breeding pairs. Please try another pair.",
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.timer
                ) {
                  window.location.reload();
                }
              });
            } else {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigateTo("/breeding");
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
    });

    console.log("onpair");
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Add Breeding Pair</h3>
        <div className="breed-ground">
          <div className="ground">
            <h6>Male</h6>
            {scanResult ? (
              <div className="d-flex flex-column gap-1">
                <Avatar
                  shape="square"
                  size={200}
                  src={
                    <img
                      loading="lazy"
                      src={`http://localhost:8081/uploads/${rabbit.image_path
                        .split(",")[0]
                        .trim()}`}
                    />
                  }
                />
                <div className="d-flex justify-content-between">
                  <span>ID</span>
                  <span>{scanResult}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Name</span>
                  <span>{rabbit.name}</span>
                </div>
              </div>
            ) : (
              <div id="reader"></div>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h6>Match</h6>
          </div>
          <div className="ground">
            <h6>Female</h6>
            {scanResult1 ? (
              <div className="d-flex flex-column">
                <Avatar
                  shape="square"
                  size={200}
                  src={
                    <img
                      loading="lazy"
                      src={`http://localhost:8081/uploads/${rabbit1.image_path
                        .split(",")[0]
                        .trim()}`}
                    />
                  }
                />
                <div className="d-flex justify-content-between">
                  <span>ID</span>
                  <span>{scanResult1}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Name</span>
                  <span>{rabbit1.name}</span>
                </div>
              </div>
            ) : (
              <div id="reader1"></div>
            )}
          </div>
          <div className="actions">
            <Button
              onClick={(e) => {
                navigateTo("/breeding");
              }}
            >
              Back
            </Button>
            <Button
              type="primary"
              to="/breeding"
              onClick={(e) => {
                onPair(e);
              }}
            >
              Pair now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreedPair;
