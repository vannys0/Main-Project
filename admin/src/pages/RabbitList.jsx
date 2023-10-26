import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Table from "react-bootstrap/Table";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function RabbitList() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [rabbits, setRabbits] = useState([]);
  const [record, setRecord] = useState([]);

  const onRehome = (e, o) => {
    axios
      .put(BASE_URL + "/update-rehome/" + o.id, {
        rehome: "Rehome",
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onUnRehome = (e, o) => {
    axios
      .put(BASE_URL + "/update-rehome/" + o.id, {
        rehome: null,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/rabbits")
      .then((res) => {
        setRabbits(res.data);
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
    console.log(rabbits);
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Confirm delete?",
      text: "Are you sure? You want to delete this?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Successfully deleted.", "success");
        axios.delete(BASE_URL + "/delete-rabbit/" + id);
        window.location.reload();
      }
    });
  };

  // Search rabbit filter
  const Filter = (e) => {
    setRecord(
      rabbits.filter((f) => f.name.toLowerCase().includes(e.target.value))
    );
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>Rabbit List</h3>
        <div className="search-filter-div">
          <input
            type="text"
            name=""
            className="form-control"
            placeholder="Search rabbit by name"
            onChange={Filter}
          />
        </div>
        <br />
        <div className="d-flex">
          <Link to="/add-rabbit" className="primary text-decoration-none">
            Add Rabbit
          </Link>
        </div>
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Age</th>
              <th>Sex</th>
              <th>Weight</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {record.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>
                  <img
                    style={{ width: "25px", height: "25px" }}
                    src={`http://localhost:8081/uploads/${data.image_path}`}
                  />
                </td>

                <td>{data.age}</td>
                <td>{data.sex}</td>
                <td>{data.weight}</td>
                <td className="actions">
                  <Link
                    to={`/edit-rabbit/${data.id}`}
                    className="success text-decoration-none"
                  >
                    Edit
                  </Link>

                  {data.rehome === "Rehome" ? (
                    <Link
                      className="secondary"
                      onClick={(e) => onUnRehome(e, data)}
                    >
                      Rehome
                    </Link>
                  ) : (
                    <Link
                      className="primary"
                      onClick={(e) => onRehome(e, data)}
                    >
                      Rehome
                    </Link>
                  )}

                  <Link
                    className="danger"
                    onClick={(e) => handleDelete(data.id)}
                  >
                    Delete
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

export default RabbitList;
