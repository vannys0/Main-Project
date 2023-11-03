import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewRequest from "./ReviewRequest";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Request() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [values, setValues] = useState([]);

  const onApprove = (e, o) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approved this request?",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Approved!", "Request has been approved.", "success");
        axios
          .put(BASE_URL + "/approve-adoption/" + o.id)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const onDecline = (e, o) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to decline this request?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, decline it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Declined!", "Request has been declined.", "success");
        axios
          .put(BASE_URL + "/decline-adoption/" + o.id)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
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
        <h3>Adoption request</h3>
        <br />

        <Table striped hover responsive="sm">
          {values.length > 0 && (
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
          )}
          <tbody>
            {values.length > 0 ? (
              values.map((data, i) => (
                <tr key={i}>
                  <td>{data.fullname}</td>
                  <td>
                    {data.barangay}, {data.city}, {data.province}
                  </td>
                  <td>{data.adoption_date}</td>
                  <td>{data.service_option}</td>
                  <td>
                    {data.transaction_status === "Pending" ? (
                      <span style={{ color: "#d50000" }}>
                        {data.transaction_status}
                      </span>
                    ) : (
                      <span style={{ color: "#2e7d32" }}>
                        {data.transaction_status}
                      </span>
                    )}
                  </td>
                  <td className="actions">
                    <ReviewRequest data={data} />
                    <Link
                      className="success"
                      onClick={(e) => onApprove(e, data)}
                    >
                      Approve
                    </Link>
                    <Link
                      className="danger"
                      onClick={(e) => onDecline(e, data)}
                    >
                      Decline
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No results found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Request;
