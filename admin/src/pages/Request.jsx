import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReviewRequest from "./ReviewRequest";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag, Space, Pagination, Dropdown } from "antd";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Request() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [values, setValues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 6;

  const [filteredValues, setFilteredValues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

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
        axios
          .put(BASE_URL + "/approve-adoption/" + o.id)
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
  };

  const onDecline = (e, o) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to decline this request?",
      input: "text",
      inputPlaceholder: "Comment",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Decline",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(BASE_URL + "/decline-adoption/" + o.id, {
            comment: result.value,
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
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/adoptions")
      .then((res) => {
        setValues(res.data);
        setFilteredValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const getDisplayedData = () => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return values.slice(startIndex, endIndex);
  };

  const columns = [
    {
      title: "Adoption ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => (
        <span>
          {record.barangay}, {record.city}, {record.province}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "adoption_date",
      key: "date",
    },
    {
      title: "Mode of Delivery",
      dataIndex: "service_option",
      key: "service_option",
    },
    {
      title: "Status",
      dataIndex: "adoption_status",
      key: "adoption_status",
      render: (text, record) => (
        <span>
          {record.adoption_status === "Pending" ? (
            <Tag color="warning">{record.adoption_status}</Tag>
          ) : record.adoption_status === "Declined" ? (
            <Tag color="error">{record.adoption_status}</Tag>
          ) : (
            <Tag color="success">{record.adoption_status}</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space>
          <ReviewRequest data={record} />
          {record.transaction_status === "Pending" ? (
            <Button type="primary" onClick={(e) => onApprove(e, record)}>
              Approve
            </Button>
          ) : (
            <Button type="primary" disabled>
              Approve
            </Button>
          )}
          {record.transaction_status === "Pending" ? (
            <Button type="primary" danger onClick={(e) => onDecline(e, record)}>
              Decline
            </Button>
          ) : (
            <Button type="primary" disabled>
              Decline
            </Button>
          )}
        </Space>
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
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <span>Filter</span>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <span> {selectedStatus}</span>

        <div className="tables">
          <Table
            dataSource={filteredValues}
            columns={columns}
            pagination={{
              pageSize: itemsPerPage,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Request;
