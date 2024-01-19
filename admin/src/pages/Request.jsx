import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReviewRequest from "./ReviewRequest";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { SlOptionsVertical } from "react-icons/sl";
import { Button, Input, Table, Tag, Space, Pagination, Dropdown } from "antd";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Request() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const fetchUserData = async (values) => {
    try {
      const user = await axios.get(`${BASE_URL}/user/${values.user_id}`);
      const userData = {
        userName: user.data[0].name,
        userEmail: user.data[0].email,
      };
      return userData;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching user data");
    }
  };

  const onApprove = (e, o) => {
    fetchUserData(o)
      .then((userData) => {
        Swal.fire({
          text: "Are you sure you want to approve this request?",
          showCancelButton: true,
          confirmButtonColor: "#2e7d32",
          cancelButtonColor: "#797979",
          confirmButtonText: "Approve",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .put(`${BASE_URL}/approve-adoption/${o.id}`, {
                user_name: userData.userName,
                user_email: userData.userEmail,
                rabbit_id: o.rabbit_id,
              })
              .then((res) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Approved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                window.location.reload();
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDecline = (e, o) => {
    fetchUserData(o)
      .then((userData) => {
        Swal.fire({
          text: "Are you sure you want to decline this request?",
          showCancelButton: true,
          confirmButtonColor: "#d50000",
          cancelButtonColor: "#797979",
          confirmButtonText: "Decline",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .put(`${BASE_URL}/decline-adoption/${o.id}`, {
                user_name: userData.userName,
                user_email: userData.userEmail,
              })
              .then((res) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Declined",
                  showConfirmButton: false,
                  timer: 1500,
                });
                window.location.reload();
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/adoptions")
      .then((res) => {
        setValues(res.data);
        const filtered = res.data.filter(
          (item) => item.adoption_status === selectedStatus
        );
        setFilteredValues(filtered);
      })
      .catch((err) => console.log(err));
  }, [selectedStatus]);

  const listItems = (record) => [
    {
      label: <ReviewRequest data={record} />,
      key: "0",
    },
    record.adoption_status === "Pending"
      ? {
          label: <span onClick={(e) => onApprove(e, record)}>Approve</span>,
          key: "1",
        }
      : {
          label: <span>Approve</span>,
          key: "1",
          disabled: true,
        },
    record.adoption_status === "Pending"
      ? {
          label: (
            <span danger onClick={(e) => onDecline(e, record)}>
              Decline
            </span>
          ),
          key: "2",
          danger: true,
        }
      : {
          label: <span>Decline</span>,
          key: "2",
          disabled: true,
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
      name: "Adoption Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Address",
      cell: (record) => (
        <p>
          {capitalizeFirstLetter(record.barangay)},{" "}
          {capitalizeFirstLetter(record.city)},{" "}
          {capitalizeFirstLetter(record.province)}
        </p>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.adoption_date,
      sortable: true,
      format: (record) =>
        new Date(record.adoption_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      name: "Mode of Delivery",
      selector: (row) => row.service_option,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.adoption_status,
      sortable: true,
      cell: (record) => (
        <span>
          {record.adoption_status === "Pending" ? (
            <Tag color="warning">
              <span style={{ textTransform: "uppercase" }}>
                {record.adoption_status}
              </span>
            </Tag>
          ) : record.adoption_status === "Declined" ? (
            <Tag color="error">
              <span style={{ textTransform: "uppercase" }}>
                {record.adoption_status}
              </span>
            </Tag>
          ) : (
            <Tag color="success">
              <span style={{ textTransform: "uppercase" }}>
                {record.adoption_status}
              </span>
            </Tag>
          )}
        </span>
      ),
    },
    // {
    //   name: "SGA",
    //   cell: (record) => {
    //     if (record.adoption_status !== "Pending") {
    //       return null;
    //     }

    //     if (
    //       record.mode_of_payment === "Agriculture" &&
    //       record.agriculture_product_price >= record.price
    //     ) {
    //       return "Yes";
    //     }

    //     return "No";
    //   },
    // },
    {
      name: "Actions",
      cell: (record) => (
        <Dropdown
          menu={{
            items: listItems(record),
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SlOptionsVertical
                style={{ color: "#1e1e1e", cursor: "pointer" }}
              />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status === "All") {
      setFilteredValues(values);
    } else {
      const filtered = values.filter((item) => item.adoption_status === status);
      setFilteredValues(filtered);
    }
  };

  const items = [
    {
      label: <span onClick={() => handleStatusFilter("All")}>All</span>,
      key: "0",
    },
    {
      label: <span onClick={() => handleStatusFilter("Pending")}>Pending</span>,
      key: "1",
    },
    {
      label: (
        <span onClick={() => handleStatusFilter("Approved")}>Approved</span>
      ),
      key: "2",
    },
    {
      label: (
        <span onClick={() => handleStatusFilter("Declined")}>Declined</span>
      ),
      key: "3",
    },
  ];

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Adoption request</h3>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <span
            style={{ color: "#1e1e1e" }}
            onClick={(e) => e.preventDefault()}
          >
            <Space>
              <span>Filter</span>
              <DownOutlined />
            </Space>
          </span>
        </Dropdown>
        <span> {selectedStatus}</span>

        <div className="tables">
          <DataTable
            columns={columns}
            data={filteredValues}
            pagination
            customStyles={tableHeaderStyle}
            highlightOnHover
            selectableRowsHighlight
          />
        </div>
      </div>
    </div>
  );
}

export default Request;
