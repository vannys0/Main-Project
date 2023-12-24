import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Input, Pagination, Space, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ClientUserProfile from "./Profile/ClientUserProfile";
import DataTable from "react-data-table-component";
import Default from "../images/default-profile.png";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Clients() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchedClients, setSearchedClients] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/clients")
      .then((res) => {
        setClients(res.data);
        setSearchedClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      name: "Profile",
      selector: (row) => row.profile,
      cell: (row) => {
        return (
          <Avatar
            shape="square"
            src={
              row.profile
                ? `http://localhost:8081/uploads/${row.profile}`
                : Default
            }
            alt=""
          />
        );
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row) => row.user_type,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Space>
          <ClientUserProfile data={row} />
        </Space>
      ),
    },
  ];

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().includes(value)
    );
    setSearchedClients(filteredClients);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <div className="d-flex justify-content-between">
          <h3>Users</h3>
          <Input
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
              marginBottom: "10px",
            }}
            placeholder="Search by name"
            allowClear
            size="large"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="tables">
          <DataTable
            columns={columns}
            data={searchedClients}
            pagination
            customStyles={tableHeaderStyle}
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default Clients;
