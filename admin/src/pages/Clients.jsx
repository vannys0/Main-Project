import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Table, Pagination, Space, Button } from "antd"; // Import Ant Design Table and Pagination
import axios from "axios";
import appConfig from "../../config.json";
import { useNavigate, useParams } from "react-router-dom";
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

  useEffect(() => {
    axios
      .get(BASE_URL + "/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const pagesVisited = (pageNumber - 1) * clientsPerPage;
  const displayedClients = clients.slice(
    pagesVisited,
    pagesVisited + clientsPerPage
  );

  const pageCount = Math.ceil(clients.length / clientsPerPage);

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
  };

  const columns = [
    {
      title: "Client Id",
      dataIndex: "id",
      key: "id",
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
      title: "Action",
      key: "action",
      render: (text, clients) => (
        <Space>
          <Button
            type="text"
            onClick={() => navigateTo(`/client-profile/${clients.id}`)}
          >
            View
          </Button>
        </Space>
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
        <h3>CLIENTS</h3>
        <br />
        <Table
          columns={columns}
          dataSource={displayedClients}
          pagination={false}
        />
        <Pagination
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          current={pageNumber}
          total={clients.length}
          pageSize={clientsPerPage}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Clients;
