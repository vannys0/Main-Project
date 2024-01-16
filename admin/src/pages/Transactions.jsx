import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Tag } from "antd";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Transactions() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/transactions`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  });

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
      name: "transaction id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "adoption id",
      selector: (row) => row.adoption_id,
      sortable: true,
    },
    {
      name: "transaction date",
      selector: (row) => row.transaction_date,
      sortable: true,
      format: (record) =>
        new Date(record.transaction_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      name: "remarks",
      selector: (row) => (
        <Tag color="success">
          <span style={{ textTransform: "uppercase" }}>
            {row.transaction_status}
          </span>
        </Tag>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="grid-container bg-light">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>TRANSACTIONS</h3>
        <div className="tables">
          <DataTable
            columns={columns}
            data={data}
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

export default Transactions;
