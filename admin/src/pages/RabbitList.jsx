import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Table,
  Tag,
  Space,
  Pagination,
  Avatar,
  Image,
} from "antd";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function RabbitList() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [rabbits, setRabbits] = useState([]);
  const [record, setRecord] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const onRehome = (e, o) => {
    Swal.fire({
      title: "Confirm?",
      text: "When rehoming this rabbit, the adopter will have the opportunity to request an adoption.",
      input: "number",
      inputPlaceholder: "Please input the specific amount",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#797979",
      confirmButtonText: "Rehome",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(BASE_URL + "/update-rehome/" + o.id, {
            rehome_status: "Rehome",
            price: result.value,
          })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
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

  useEffect(() => {
    axios
      .get(BASE_URL + "/rabbits")
      .then((res) => {
        setRabbits(res.data);
        setRecord(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Confirm delete?",
      text: "Are you sure? You want to delete this?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
        axios.delete(BASE_URL + "/delete-rabbit/" + id);
        window.location.reload();
      }
    });
  };

  const { Search } = Input;
  const Filter = (value) => {
    const lowerCaseValue = value.toLowerCase();
    const filteredRabbits = rabbits.filter((rabbit) =>
      rabbit.name.toLowerCase().includes(lowerCaseValue)
    );
    setRecord(filteredRabbits);
  };

  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    const years = currentDate.getFullYear() - birthDate.getFullYear();
    const months = currentDate.getMonth() - birthDate.getMonth();

    const adjustedMonths =
      months + (currentDate.getDate() < birthDate.getDate() ? -1 : 0);

    return {
      years,
      months: adjustedMonths < 0 ? 0 : adjustedMonths,
    };
  }

  // Table
  const columns = [
    {
      title: "Image",
      dataIndex: "image_path",
      key: "image_path",
      render: (image_path) => {
        const imagePaths = image_path.split(",");
        const firstImagePath = imagePaths[0];

        return (
          <div>
            {firstImagePath && (
              <Avatar
                src={
                  <img
                    src={`http://localhost:8081/uploads/${firstImagePath}`}
                  />
                }
              />
            )}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (dateOfBirth) => {
        const age = calculateAge(dateOfBirth);
        return `${age.years} yrs ${age.months} mos`;
      },
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Breed",
      dataIndex: "breed_type",
      key: "breed_type",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Type",
      dataIndex: "rabbit_type",
      key: "rabbit_type",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button onClick={() => navigateTo(`/edit-rabbit/${record.id}`)}>
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
      <div className="main-container bg-light">
        <div className="d-flex align-items-center justify-content-between">
          <h3>Rabbit List</h3>
          <Search
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
            }}
            placeholder="Search"
            allowClear
            size="large"
            onSearch={Filter}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end my-2">
          <Button type="primary" onClick={() => navigateTo("/add-rabbit")}>
            Add
          </Button>
        </div>
        <div className="tables">
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
