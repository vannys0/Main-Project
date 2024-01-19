import React, { useState, useEffect } from "react";
import Tree from 'react-d3-tree';
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Input, Pagination, Space, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;
const IMAGE_URL = appConfig.imagePath;

const orgChart = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        children: [
          {
            name: 'Foreman',
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };
  


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
          <h3>Family Tree</h3>
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

        <div id="treeWrapper" style={{ width: '50em', height: '20em' }} className="d-flex justify-content-between h-100">
                <Tree data={orgChart} />
        </div>
    
      
      </div>
    </div>
  );
}

export default Clients;
