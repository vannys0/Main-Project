import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function BreedPair() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [maleRabbits, setMaleRabbits] = useState([]);
  const [femaleRabbits, setFemaleRabbits] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/rabbit/male")
      .then((res) => {
        setMaleRabbits(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL + "/rabbit/female")
      .then((res) => {
        setFemaleRabbits(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [scanResult, setScanResult] = useState();
  const [scanResult1, setScanResult1] = useState();

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
        male_rabbit_id: scanResult.substring(4, scanResult.indexOf(",")),
        female_rabbit_id: scanResult1.substring(4, scanResult1.indexOf(",")),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    console.log("onpair");
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>Add Rabbit Pair</h3>
        <br />
        <div className="breed-ground">
          <div className="ground">
            Male
            <Form.Select aria-label="Default select example">
              <option value="" hidden>
                Select rabbit
              </option>
              {maleRabbits.map((data, i) => (
                <option key={i} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
            <span>or</span>
            {scanResult ? (
              <div>Result: {scanResult}</div>
            ) : (
              <div id="reader"></div>
            )}
            <button className="btn btn-primary">Scan code</button>
          </div>
          <div className="center-ground">Matching result</div>
          <div className="ground">
            Female
            <Form.Select aria-label="Default select example">
              <option value="" hidden>
                Select rabbit
              </option>
              {femaleRabbits.map((data, i) => (
                <option key={i} value={data.name}>
                  {data.name}
                </option>
              ))}
            </Form.Select>
            <span>or</span>
            {scanResult1 ? (
              <div>Result: {scanResult1}</div>
            ) : (
              <div id="reader1"></div>
            )}
            <button className="btn btn-primary">Scan code</button>
          </div>
        </div>
        <br />
        <br />
        <div className="actions">
          <Link to="/breeding" className="secondary text-decoration-none">
            Cancel
          </Link>
          <Link
            to="/breeding"
            onClick={(e) => onPair(e)}
            className="primary text-decoration-none"
          >
            Pair now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BreedPair;
