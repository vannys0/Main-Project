import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewRequest from "./ReviewRequest";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Request() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [values, setValues] = useState([]);

  const onApprove = (e, o) => {
    axios
      .put(BASE_URL + "/approve-adoption/" + o.id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onDecline = (e, o) => {
    axios
      .put(BASE_URL + "/decline-adoption/" + o.id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/adoptions")
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>REQUEST</h3>
        <Table bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Delivery Option</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {values.map((data, i) => (
              <tr key={i}>
                <td>{data.fullname}</td>
                <td>
                  {data.barangay}, {data.city}, {data.province}
                </td>
                <td>{data.adoption_date}</td>
                <td>{data.service_option}</td>
                <td>
                  {data.transaction_status === "Pending" ? (
                    <span style={{ color: "red" }}>
                      {data.transaction_status}
                    </span>
                  ) : (
                    <span style={{ color: "green" }}>
                      {data.transaction_status}
                    </span>
                  )}
                </td>
                <td className="actions">
                  <ReviewRequest data={data} />
                  <Link className="success" onClick={(e) => onApprove(e, data)}>
                    Approve
                  </Link>
                  <Link className="danger" onClick={(e) => onDecline(e, data)}>
                    Decline
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Request;
