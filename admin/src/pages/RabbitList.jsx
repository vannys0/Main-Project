import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "react-data-table-component";
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
  Dropdown,
} from "antd";
import { BiQrScan } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import ScanRabbitQr from "./ScanRabbitQr";
import { SlOptionsVertical } from "react-icons/sl";
import { SearchOutlined } from "@ant-design/icons";
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

  const [slaughter, setSlaughter] = useState("1 yrs 1 mos");
  const onRehome = (e, o) => {
    Swal.fire({
      title: "Confirm?",
      text: "When rehoming this rabbit, the adopter will have the opportunity to request an adoption.",
      input: "number",
      inputPlaceholder: "Please input the adoption fee",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#797979",
      confirmButtonText: "Rehome",
      preConfirm: (note) => {
        if (!note) {
          Swal.showValidationMessage("Field cannot be empty");
        }
        return note;
      },
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

    axios
      .get(BASE_URL + "/config/rabbit.age.slaughter")
      .then((res) => {
        if (res.data.length > 0) {
          setSlaughter(res.data[0].value);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this rabbit from the list?",
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
      years--;
      months = 12 + months;
    }

    return `${years} yrs and ${months} mos`;
  };

  const items = (record) => [
    {
      label: (
        <span onClick={() => navigateTo(`/edit-rabbit/${record.id}`)}>
          Edit
        </span>
      ),
      key: "0",
    },
    {
      label:
        record.rehome_status === "Rehome" ? (
          <span type="primary" onClick={(e) => onUnRehome(e, record)}>
            Cancel rehome
          </span>
        ) : (
          <span type="primary" onClick={(e) => onRehome(e, record)}>
            Rehome
          </span>
        ),
    },
    {
      label: <span onClick={(e) => handleDelete(record.id)}>Delete</span>,
      key: "3",
      danger: true,
    },
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        color: "#ffffff",
        fontSize: "14px",
        backgroundColor: "#1677ff",
        textTransform: "uppercase",
      },
    },
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => row.image_path,
      cell: (row) => {
        const imagePaths = row.image_path.split(",");
        const firstImagePath = imagePaths[0];

        return (
          <div>
            {firstImagePath && (
              <Avatar
                shape="square"
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.date_of_birth,
      sortable: true,
      cell: (row) => calculateAge(row.date_of_birth),
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: "Breed",
      selector: (row) => row.breed_type,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
    // {
    //   name: "Slaughter",
    //   cell: (row) => {
    //     if (row.rabbit_type === "Meat rabbit") {
    //       const age = calculateAge(row.date_of_birth);
    //       return age.localeCompare(slaughter) >= 0 ? "YES" : "NO"; // slaughtere from config
    //     }
    //     return null;
    //   },
    // },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          menu={{
            items: items(row),
          }}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <a onClick={(e) => e.preventDefault()}>
            <SlOptionsVertical style={{ color: "#1e1e1e" }} />
          </a>
        </Dropdown>
      ),
    },
  ];

  const Filter = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredRabbits = rabbits.filter((rabbit) =>
      rabbit.name.toLowerCase().includes(value)
    );
    setRecord(filteredRabbits);
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
          <Input
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
            }}
            placeholder="Search by name"
            allowClear
            size="large"
            onChange={Filter}
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end my-3 gap-3">
          <div className="btn-add" onClick={() => navigateTo("/add-rabbit")}>
            <IoMdAdd />
          </div>
          <div className="btn-scan" onClick={() => navigateTo("/scan-rabbit")}>
            <BiQrScan />
          </div>
        </div>
        <div className="tables">
          <DataTable
            columns={columns}
            data={record}
            pagination
            customStyles={tableHeaderStyle}
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default RabbitList;
