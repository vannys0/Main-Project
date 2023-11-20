import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Form } from "react-bootstrap";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import appConfig from "../../config.json";
import { useNavigate } from "react-router-dom";
const BASE_URL = appConfig.apiBasePath;

function BreedPair() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [scanResult, setScanResult] = useState();
  const [scanResult1, setScanResult1] = useState();
  const [maleRabbits, setMaleRabbits] = useState([]);
  const [femaleRabbits, setFemaleRabbits] = useState([]);

  const currentDate = new Date();

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
      setScanResult(result);
      console.log(result);
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
      setScanResult1(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const onPair = (e) => {
    axios
      .post(BASE_URL + "/pair-rabbit", {
        id: uuidv4(),
        male_rabbit_id: scanResult,
        female_rabbit_id: scanResult1,
        date: currentDate,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    console.log("onpair");
  };

  const readerStyle = {
    border: "2px solid #333",
    borderRadius: "8px",
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
        <br />
        <div className="breed-ground">
          <div className="ground">
            {scanResult ? (
              <span>ID: {scanResult}</span>
            ) : (
              <div id="reader"></div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <h6> Matching result</h6>
          </div>
          <div className="ground">
            {scanResult1 ? (
              <span>ID: {scanResult1}</span>
            ) : (
              <div id="reader1"></div>
            )}
          </div>
        </div>
        <div className="actions d-flex justify-content-end my-2">
          <Button
            type="primary"
            danger
            onClick={(e) => {
              navigateTo("/breeding");
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            to="/breeding"
            onClick={(e) => {
              navigateTo("/breeding");
              onPair(e);
            }}
          >
            Pair now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BreedPair;
