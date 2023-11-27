import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Input, Table, Pagination, Space, Button, Avatar, Image } from "antd";
import axios from "axios";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
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
  const clientsPerPage = 6;
  const [searchedClients, setSearchedClients] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setSearchedClients(clients);
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
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      render: (profile) => {
        return (
          <div>
            {profile ? (
              <Avatar
                src={<img src={`http://localhost:8081/uploads/${profile}`} />}
              />
            ) : (
              <Avatar
                style={{
                  color: "#fff",
                  backgroundColor: "#eaeaea",
                }}
                icon={<UserOutlined />}
              />
            )}
          </div>
        );
      },
    },
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
          <Button onClick={() => navigateTo(`/client-profile/${client.id}`)}>
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

        <div className="tables">
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
