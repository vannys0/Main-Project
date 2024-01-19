import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button, Avatar } from "antd";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;
const IMAGE_URL = appConfig.imagePath;

function ScanRabbitQr() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [data, setData] = useState(null);
  const [scanResult, setScanResult] = useState();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/scan-rabbit?id=${scanResult}`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.log(err));
  }, [scanResult]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    const years = currentDate.getFullYear() - birthDate.getFullYear();
    var months = currentDate.getMonth() - birthDate.getMonth();

    const adjustedMonths =
      months + (currentDate.getDate() < birthDate.getDate() ? -1 : 0);

    months = adjustedMonths < 0 ? 0 : adjustedMonths;

    return years + " yrs " + months + " mos";
  }

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Scan Rabbit</h3>
        <div className="scan-rabbit-div">
          {scanResult ? (
            <div>
              {data ? (
                <div>
                  <h5>Result</h5>
                  <div className="scan-result">
                    <div>
                      <Avatar
                        shape="square"
                        size={200}
                        src={
                          <img
                            loading="lazy"
                            src={`${IMAGE_URL}/uploads/${data.image_path
                              .split(",")[0]
                              .trim()}`}
                          />
                        }
                      />
                    </div>
                    <div className="scan-info">
                      <div>
                        <span>Rabbit ID</span>
                        <span>{data.id}</span>
                      </div>
                      <div>
                        <span>Name</span>
                        <span>{data.name}</span>
                      </div>
                      <div>
                        <span>Age</span>
                        <span>{calculateAge(data.date_of_birth)}</span>
                      </div>
                      <div>
                        <span>Gender</span>
                        <span>{data.sex}</span>
                      </div>
                      <div>
                        <span>Rabbit Type</span>
                        <span>{data.rabbit_type}</span>
                      </div>
                      <div>
                        <span>Color</span>
                        <span>{data.color}</span>
                      </div>
                      <div>
                        <span>Breed Type</span>
                        <span>{data.breed_type}</span>
                      </div>
                      <div>
                        <span>Weight</span>
                        <span>{data.weight} kgs</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="primary"
                      onClick={() => window.location.reload()}
                    >
                      Scan again
                    </Button>
                  </div>
                </div>
              ) : (
                <span>No data available</span>
              )}
            </div>
          ) : (
            <div id="reader"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScanRabbitQr;
