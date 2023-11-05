import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Table, Button, Pagination, Tag } from "antd"; // Import Ant Design Table, Button, and Pagination
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Delivery() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [values, setValues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // Ant Design Pagination starts from 1
  const itemsPerPage = 7;

  const pagesVisited = (pageNumber - 1) * itemsPerPage;
  const displayedValues = values.slice(
    pagesVisited,
    pagesVisited + itemsPerPage
  );

  const totalItems = values.length;

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
  };

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

  const columns = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => (
        <span>
          {record.barangay}, {record.city}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "adoption_date",
      key: "adoption_date",
    },
    {
      title: "Delivery Status",
      key: "delivery_status",
      render: (text, record) => (
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
      title: "Action",
      key: "action",
      render: (text, record) =>
        record.delivery_status === "Approved" ? (
          <Button type="primary" disabled>
            Approve
          </Button>
        ) : (
          <Button type="primary" onClick={(e) => onApprove(e, record)}>
            Approve
          </Button>
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
      <div className="main-container">
        <h3>Delivery</h3>
        <br />
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={displayedValues}
            pagination={false}
          />
        </div>
        <Pagination
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          current={pageNumber}
          total={totalItems}
          pageSize={itemsPerPage}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Delivery;
