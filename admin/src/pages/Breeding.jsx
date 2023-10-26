import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import appConfig from "../../config.json";
import BreedingDetails from "./BreedingDetails";
import Swal from "sweetalert2";
const BASE_URL = appConfig.apiBasePath;

function Breeding() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/breeding")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "You have been cancel this list.", "success");
        axios.delete(BASE_URL + "/cancel_breeding/" + id);
        window.location.reload();
      }
    });
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>Breeding List</h3>
        <br />
        <div className="d-flex">
          <Link
            to="/add-breed-pair"
            className="success breed-btn text-decoration-none"
          >
            Add Pair
          </Link>
        </div>
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th>Male</th>
              <th>Female</th>
              <th>Pairing date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => (
              <tr key={i}>
                <td>{data.buck_id}</td>
                <td>{data.doe_id}</td>
                <td>{data.pairing_date}</td>
                <td className="actions">
                  <BreedingDetails data={data} />
                  <Link
                    className="danger"
                    onClick={(e) => handleDelete(data.id)}
                  >
                    Cancel
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

export default Breeding;
