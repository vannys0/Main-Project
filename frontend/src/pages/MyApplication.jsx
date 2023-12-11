import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./style.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ViewApplication from "./ViewApplication";
import { Button, Tag, Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";
import appConfig from "../../config.json";
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
      title: "Are you sure?",
      text: "you want to cancel this?",
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
          showConfirmButton: false,
          timer: 1500,
        });
        axios.delete(`${BASE_URL}/delete_application/${id}`);
        window.location.reload();
      }
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "adoption_date",
      key: "adoption_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Delivery Option",
      dataIndex: "service_option",
      key: "service_option",
    },
    {
      title: "Status",
      dataIndex: "adoption_status",
      key: "adoption_status",
      render: (text) => {
        let color = "";
        if (text === "Pending") color = "warning";
        else if (text === "Declined") color = "error";
        else color = "success";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 100,
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-2">
          <Button type="text" onClick={() => handleClick(record)}>
            View
          </Button>
          {record.adoption_status === "Pending" ? (
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Cancel
            </Button>
          ) : (
            <span style={{ color: "black" }}></span>
          )}
        </div>
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
      label: <Link onClick={() => handleStatusFilter("All")}>All</Link>,
      key: "0",
    },
    {
      label: <Link onClick={() => handleStatusFilter("Pending")}>Pending</Link>,
      key: "1",
    },
    {
      label: (
        <Link onClick={() => handleStatusFilter("Approved")}>Approved</Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link onClick={() => handleStatusFilter("Declined")}>Declined</Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link onClick={() => handleStatusFilter("Cancelled")}>Cancelled</Link>
      ),
      key: "4",
    },
  ];

  return (
    <div className="main-div">
      <Navbar />
      <div className="application-div">
        <div className="thumbnail">
          <h5>Recent Adoption</h5>
        </div>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
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
