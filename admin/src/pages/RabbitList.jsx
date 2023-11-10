import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Table, Tag, Space, Pagination, Image } from "antd";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function RabbitList() {
  // Responsive Sidebar
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [rabbits, setRabbits] = useState([]);
  const [record, setRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  // Rehome Rabbit
  const onRehome = (e, o) => {
    axios
      .put(BASE_URL + "/update-rehome/" + o.id, {
        rehome_status: "Rehome",
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onUnRehome = (e, o) => {
    axios
      .put(BASE_URL + "/update-rehome/" + o.id, {
        rehome_status: null,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  // Get
  useEffect(() => {
    axios
      .get(BASE_URL + "/rabbits")
      .then((res) => {
        setRabbits(res.data);
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Delete Rabbit
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
  // Search Function
  const { Search } = Input;
  const Filter = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredRabbits = rabbits.filter((rabbit) =>
      rabbit.name.toLowerCase().includes(lowerCaseValue)
    );
    setRecord(filteredRabbits);
  };
  // Table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image_path",
      key: "image_path",
      render: (imagePath) => (
        <Image
          style={{ width: "25px", height: "25px" }}
          src={`http://localhost:8081/uploads/${imagePath}`}
        />
      ),
    },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Weight (klg/s)",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button
            type="text"
            onClick={() => navigateTo(`/edit-rabbit/${record.id}`)}
          >
            Edit
          </Button>
          {record.rehome_status === "Rehome" ? (
            <Button
              disabled
              type="primary"
              onClick={(e) => onUnRehome(e, record)}
            >
              Rehome
            </Button>
          ) : (
            <Button type="primary" onClick={(e) => onRehome(e, record)}>
              Rehome
            </Button>
          )}
          <Button
            type="primary"
            danger
            onClick={(e) => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = record.slice(indexOfFirstItem, indexOfLastItem);
  const paginationProps = {
    current: currentPage,
    total: record.length,
    pageSize: itemsPerPage,
    onChange: (page) => setCurrentPage(page),
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
          <br />
          <Search
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
              marginBottom: "10px",
              backgroundColor: "#eaeaea",
            }}
            placeholder="Search rabbit by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={Filter}
          />
        </div>

        <div className="d-flex">
          <Button type="primary" onClick={() => navigateTo("/add-rabbit")}>
            Add Rabbit
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={currentItems}
            pagination={paginationProps}
          />
        </div>
      </div>
    </div>
  );
}

export default RabbitList;
