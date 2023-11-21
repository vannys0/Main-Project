import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SecureStore from "react-secure-storage";
import axios from "axios";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Table, Col, Row, Statistic, Space, Avatar } from "antd";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const user = SecureStore.getItem("userToken");

  const [userCount, setUserCount] = useState(0);
  const [rabbitCount, setRabbitCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [rabbit, setRabbit] = useState([]);
  const [clients, setClients] = useState([]);

  //chart api
  const [monthSales, setMonthSales] = useState([]);
  const [adopt, setAdopt] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/userCount")
      .then((response) => {
        setUserCount(response.data[0].userCount);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/countRabbits")
      .then((response) => {
        setRabbitCount(response.data[0].rabbitCount);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/pending-adoption")
      .then((response) => {
        setPending(response.data[0].pending);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/recent-rabbit")
      .then((res) => {
        setRabbit(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/chart-adoption")
      .then((res) => {
        setAdopt(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/chart-monthly-sales")
      .then((res) => {
        setMonthSales(res.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/recent-adoption")
      .then((res) => {
        setClients(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigateTo = useNavigate();

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container bg-light">
        <h3>Dashboard</h3>
        <div className="main-cards">
          <div className="card-div" onClick={(e) => navigateTo("/clients")}>
            <div className="card-inner">
              <h5>Clients</h5>
              <div style={{ backgroundColor: "#1677ff" }}>
                <BsPeopleFill className="card_icon " />
              </div>
            </div>
            <h5>{userCount}</h5>
          </div>

          <div className="card-div" onClick={() => navigateTo("/request")}>
            <div className="card-inner">
              <h5>Pending</h5>
              <div style={{ backgroundColor: "#faad14" }}>
                <BsFillGrid3X3GapFill className="card_icon" />
              </div>
            </div>
            <h5>{pending}</h5>
          </div>
          <div className="card-div" onClick={(e) => navigateTo("/rabbits")}>
            <div className="card-inner">
              <h5>Rabbits</h5>
              <div style={{ backgroundColor: "#52c41a" }}>
                <BsFillArchiveFill className="card_icon" />
              </div>
            </div>
            <h5>{rabbitCount}</h5>
          </div>
          <div className="card-div">
            <div className="card-inner">
              <h5>Upcoming</h5>
              <div style={{ backgroundColor: "#ff4d4f" }}>
                <BsFillBellFill className="card_icon" />
              </div>
            </div>
            <h5>42</h5>
          </div>
        </div>

        <h4>Adoption</h4>
        <ResponsiveContainer width="100%" height="75%">
          <BarChart
            className="bar-chart"
            style={{
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#fff",
            }}
            width={500}
            height={300}
            data={adopt}
            margin={{
              top: 20,
              right: 50,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Adopt" fill="#1677ff" />
          </BarChart>
        </ResponsiveContainer>

        <br />
        <h4>Sales</h4>
        <ResponsiveContainer width="100%" height="75%">
          <LineChart
            style={{
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#fff",
            }}
            width={500}
            height={300}
            data={monthSales}
            margin={{
              top: 20,
              right: 50,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#1677ff"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="activity">
          <div
            className="rabbit-added"
            style={{
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#fff",
            }}
          >
            <h6>Recent Added</h6>
            <div style={{ overflowX: "auto" }}>
              <Table dataSource={rabbit} pagination={false}>
                <Table.Column title="Rabbit name" dataIndex="name" key="name" />
                <Table.Column title="Sex" dataIndex="sex" key="sex" />
                <Table.Column
                  title="Breed"
                  dataIndex="breed_type"
                  key="breed_type"
                />
                <Table.Column title="Color" dataIndex="color" key="color" />
              </Table>
            </div>
          </div>
          <div
            className="recent-activity"
            style={{
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#fff",
            }}
          >
            <h6>Recent Adoption</h6>
            <div style={{ overflowX: "auto" }}>
              <Table dataSource={clients} pagination={false}>
                <Table.Column
                  title="Profile"
                  dataIndex="profile"
                  key="profile"
                  render={(profile) => (
                    <div>
                      {profile ? (
                        <Avatar
                          src={`http://localhost:8081/uploads/${profile}`}
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
                  )}
                />

                <Table.Column
                  title=" Name"
                  dataIndex="fullname"
                  key="fullname"
                />
                <Table.Column
                  title="Adoption Date"
                  dataIndex="adoption_date"
                  key="adoption_date"
                />
                <Table.Column
                  title="Status"
                  dataIndex="transaction_status"
                  key="transaction_status"
                />
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
