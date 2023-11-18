import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Input, Table, Pagination, Space, Button } from "antd"; // Import Ant Design Table and Pagination
import axios from "axios";
import appConfig from "../../config.json";
import { useNavigate } from "react-router-dom";
const BASE_URL = appConfig.apiBasePath;

function Clients() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [clients, setClients] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const clientsPerPage = 7;
  const [searchedClients, setSearchedClients] = useState([]); // State for searched clients

  useEffect(() => {
    axios
      .get(BASE_URL + "/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setSearchedClients(clients); // Initialize searchedClients with all clients
  }, [clients]);

  const pagesVisited = (pageNumber - 1) * clientsPerPage;
  const displayedClients = searchedClients.slice(
    pagesVisited,
    pagesVisited + clientsPerPage
  );

  const pageCount = Math.ceil(searchedClients.length / clientsPerPage);

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, client) => (
        <Space>
          <Button
            type="text"
            onClick={() => navigateTo(`/client-profile/${client.id}`)}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  // Search Function
  const { Search } = Input;
  const onSearch = (value) => {
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().includes(value.toLowerCase())
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
          <Search
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
              marginBottom: "10px",
            }}
            placeholder="Search"
            allowClear
            size="large"
            onSearch={onSearch}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={displayedClients}
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
          total={searchedClients.length}
          pageSize={clientsPerPage}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Clients;
