import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { AiOutlineDatabase } from "react-icons/ai";
import axios from "axios";
import appConfig from "../../config.json";
import BreedingDetails from "./BreedingDetails";
import { Button } from "react-bootstrap";
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
    try {
      await axios.delete(BASE_URL + "/cancel_breeding/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>BREEDING LIST</h3>
        <br />
        <div className="d-flex">
          <Link
            to="/add-breed-pair"
            className="success breed-btn text-decoration-none"
          >
            Add Pair
          </Link>
        </div>
        <Table striped bordered hover>
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
                    <FaTrash className="danger" />
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
