import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { SlOptionsVertical } from "react-icons/sl";
import { Table, Button, Pagination, Tag, Dropdown, Space } from "antd";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Delivery() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/adoptions-deliver")
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onApprove = (e, o) => {
    axios
      .put(BASE_URL + "/approve-delivery/" + o.id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onDelivered = (id, rabbit_id) => {
    const payload = {
      adoption_id: id,
      transaction_date: new Date().toISOString(),
      transaction_status: "Completed",
      rabbit_id: rabbit_id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to confirm delivery?",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${BASE_URL}/delivered`, payload)
          .then((res) => {
            window.location.reload();
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const items = (record) => [
    record.delivery_status === "Approved"
      ? {
          label: <span>Deliver</span>,
          key: "0",
          disabled: true,
        }
      : {
          label: <span onClick={(e) => onApprove(e, record)}>Deliver</span>,
          key: "0",
        },
    record.delivery_status === "Approved"
      ? {
          label: (
            <span onClick={() => onDelivered(record.id, record.rabbit_id)}>
              Delivered
            </span>
          ),
          key: "1",
        }
      : {
          label: <span>Delivered</span>,
          key: "1",
          disabled: true,
        },
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        color: "#ffffff",
        fontSize: "14px",
        backgroundColor: "#1677ff",
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
      name: "Name",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Contact number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      cell: (record) => (
        <span>
          {record.barangay}, {record.city}, {record.province}
        </span>
      ),
    },
    {
      name: "Delivery Status",
      cell: (record) => (
        <span>
          {record.delivery_status === "Approved" ? (
            <Tag color="success">Approved</Tag>
          ) : (
            <Tag color="warning">Pending</Tag>
          )}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (record) => (
        <Dropdown
          menu={{
            items: items(record),
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SlOptionsVertical style={{ color: "#1e1e1e" }} />
            </Space>
          </a>
        </Dropdown>
      ),
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
        <h3>Delivery {values.id}</h3>

        <div className="tables">
          <DataTable
            columns={columns}
            data={values}
            pagination
            customStyles={tableHeaderStyle}
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default Delivery;
