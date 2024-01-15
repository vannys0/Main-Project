import React, { useEffect, useRef, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { IoMdCloudUpload } from "react-icons/io";
import { Button, Avatar } from "antd";
import QrScanner from "qr-scanner";
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
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
  
    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
  
    imageElement.onload = async () => {
      try {
        const result = await QrScanner.scanImage(imageElement);
        console.log(result);
        setScanResult(result);
  
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/get_sex?id=${result}`
            );
            const rabbitData = response.data[0];

            if (!rabbitData) {
              Swal.fire({
                icon: "error",
                title: "Invalid Rabbit",
                text: "Rabbit not found in the records. Please check the QR code or try another one.",
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.timer
                ) {
                  window.location.reload();
                }
              });
              return;
            }
  
            if (rabbitData) {
              setRabbit(rabbitData);
  
              const scannedSex = rabbitData.sex;

              if(rabbitData.rehome_status === "Rehome") {
                Swal.fire({
                  icon: "error",
                  title: "Unable to pair",
                  text: "This rabbit is for rehome.",
                }).then((result) => {
                  if (
                    result.isConfirmed ||
                    result.dismiss === Swal.DismissReason.timer
                  ) {
                    window.location.reload();
                  }
                });
              }
  
              if (scannedSex !== "Male") {
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
            }
          } catch (err) {
            console.error(err);
          }
        };
  
        fetchData();
      } catch (error) {
        console.log(error || "No QR code found.");
      }
    };
  };

const handleImageChange1 = async (e) => {
  const file = e.target.files[0];
  setImage1(file);

  const imageElement = new Image();
  imageElement.src = URL.createObjectURL(file);

  imageElement.onload = async () => {
    try {
      const result = await QrScanner.scanImage(imageElement);
      console.log(result);
      setScanResult1(result);

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/get_sex?id=${result}`
          );
          const rabbitData = response.data[0];

          if (!rabbitData) {
            Swal.fire({
              icon: "error",
              title: "Invalid Rabbit",
              text: "Rabbit not found in the records. Please check the QR code or try another one.",
            }).then((result) => {
              if (
                result.isConfirmed ||
                result.dismiss === Swal.DismissReason.timer
              ) {
                window.location.reload();
              }
            });
            return;
          }

          if (rabbitData) {
            setRabbit1(rabbitData);

            const scannedSex = rabbitData.sex;

            if(rabbitData.rehome_status === "Rehome") {
              Swal.fire({
                icon: "error",
                title: "Unable to pair",
                text: "This rabbit is for rehome.",
              }).then((result) => {
                if (
                  result.isConfirmed ||
                  result.dismiss === Swal.DismissReason.timer
                ) {
                  window.location.reload();
                }
              });
            }

            if (scannedSex !== "Female") {
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
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    } catch (error) {
      console.log(error || "No QR code found.");
    }
  };
};

  const handleUpload = () => {
    inputRef.current.click();
  };

  const handleUpload1 = () => {
    inputRef1.current.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/get_sex?id=${scanResult}`
        );
        const rabbitData = response.data[0];

        if (rabbitData) {
          setRabbit(rabbitData);

          const scannedSex = rabbitData.sex;

          if (scannedSex !== "Male") {
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
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [scanResult]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/get_sex?id=${scanResult1}`
        );
        const rabbitData = response.data[0];

        if (rabbitData) {
          setRabbit1(rabbitData);

          const scannedSex = rabbitData.sex;

          if (scannedSex !== "Female") {
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
          } else {
            setScanResult1(rabbitData.id);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [scanResult1]);

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

    if (!scanResult || !scanResult1) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please scan both male and female rabbits for pairing.",
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          window.location.reload();
        }
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
            <span>Male</span>
            <div className="uploader">
              {image ? (
                <img
                  className="qr-code"
                  src={URL.createObjectURL(image)}
                  alt=""
                />
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  onClick={handleUpload}
                >
                  <IoMdCloudUpload className="icons" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    name="file"
                    accept=".png, .jpg, .jpeg"
                    ref={inputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
            {rabbit && (
              <div className="result">
                <span>{rabbit.name}</span>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h6>Match</h6>
          </div>
          <div className="ground">
          <span>Female</span>
            <div className="uploader">
              {image1 ? (
                <img
                  className="qr-code"
                  src={URL.createObjectURL(image1)}
                  alt=""
                />
              ) : (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  onClick={handleUpload1}
                >
                  <IoMdCloudUpload className="icons" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    name="file"
                    accept=".png, .jpg, .jpeg"
                    ref={inputRef1}
                    onChange={handleImageChange1}
                    style={{ display: "none" }}
                  />
                </div>
              )}
            </div>
            {rabbit1 && (
              <div className="result">
                <span>{rabbit1.name}</span>
              </div>
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
