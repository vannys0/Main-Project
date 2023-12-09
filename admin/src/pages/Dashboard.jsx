import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import { LuUsers, LuBell } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";
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
import { RiPassPendingLine } from "react-icons/ri";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container bg-light">
        <h3>Dashboard</h3>
        {/* <div className="videoDiv">
          <video src={Video} autoPlay loop muted></video>
        </div> */}
        <div className="main-cards">
          <div className="card-div" onClick={(e) => navigateTo("/clients")}>
            <div className="card-inner">
              <h5>Clients</h5>

              <LuUsers className="card_icon " />
            </div>
            <h5>{userCount}</h5>
          </div>
          <div className="card-div" onClick={() => navigateTo("/request")}>
            <div className="card-inner">
              <h5>Pending</h5>

              <RiPassPendingLine className="card_icon" />
            </div>
            <h5>{pending}</h5>
          </div>
          <div className="card-div" onClick={(e) => navigateTo("/rabbits")}>
            <div className="card-inner">
              <h5>Rabbits</h5>

              <CiCircleList className="card_icon" />
            </div>
            <h5>{rabbitCount}</h5>
          </div>
          <div className="card-div">
            <div className="card-inner">
              <h5>Upcoming</h5>

              <LuBell className="card_icon" />
            </div>
            <h5>42</h5>
          </div>
        </div>

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
                <Table.Column title=" ID" dataIndex="id" key="id" />
                <Table.Column
                  title="Adoption Date"
                  dataIndex="adoption_date"
                  key="adoption_date"
                  render={(date) => formatDate(date)}
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
