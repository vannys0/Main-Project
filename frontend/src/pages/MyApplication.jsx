import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./style.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViewApplication from "./ViewApplication";
import { Button, Tag, Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { SlOptionsVertical } from "react-icons/sl";
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";
import appConfig from "../../config.json";
import Appli from "./Appli";
const BASE_URL = appConfig.apiBasePath;

function MyApplication() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState([]);
  const user = SecureStore.getItem("userToken");
  const itemPerPage = 7;

  const handleClick = (rowData) => {
    navigateTo(`/myapplication/application/${rowData.id}`, {
      state: { rowData },
    });
  };

  const [filteredValues, setFilteredValues] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/myapplication/${user.id}`)
      .then((res) => {
        setValues(res.data);
        setFilteredValues(res.data);
      })
      .catch((err) => console.log(err));
  }, [user.id]);

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to cancel this request?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cancelled",
          text: "Adoption request has been cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
        axios.delete(`${BASE_URL}/delete_application/${id}`);
        window.location.reload();
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const options = (record) =>
    record.adoption_status === "Pending"
      ? [
          {
            label: <Appli data={record} />,
            key: "0",
          },
          {
            label: <span onClick={() => handleDelete(record.id)}>Cancel</span>,
            key: "1",
            danger: true,
          },
        ]
      : [
          {
            label: <Appli data={record} />,
            key: "0",
          },
          {
            label: <span>Cancel</span>,
            key: "1",
            disabled: true,
          },
        ];

  const columns = [
    {
      title: "ADOPTION ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ADOPTION DATE",
      dataIndex: "adoption_date",
      key: "adoption_date",
      render: (text) => formatDate(text),
    },
    {
      title: "DELIVERY OPTION",
      dataIndex: "service_option",
      key: "service_option",
    },
    {
      title: "STATUS",
      dataIndex: "adoption_status",
      key: "adoption_status",
      render: (text) => {
        let color = "";
        if (text === "Pending") color = "warning";
        else if (text === "Declined") color = "error";
        else color = "success";
        return (
          <Tag color={color}>
            <span style={{ textTransform: "uppercase" }}>{text}</span>
          </Tag>
        );
      },
    },
    {
      title: "ACTIONS",
      key: "action",
      render: (text, record) => (
        <Dropdown
          menu={{
            items: options(record),
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
    {
      label: (
        <span onClick={() => handleStatusFilter("Cancelled")}>Cancelled</span>
      ),
      key: "4",
    },
  ];

  return (
    <div className="main-div bg-light">
      <Navbar />
      <div className="application-div">
        <h4>Recent Adoption</h4>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <a style={{ color: "#1e1e1e" }} onClick={(e) => e.preventDefault()}>
            <Space>
              Filter
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
        <span> {selectedStatus}</span>
        <div style={{ overflowX: "auto" }}>
          <Table
            dataSource={filteredValues}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{
              pageSize: itemPerPage,
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyApplication;
