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
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
import { Chart as ChartJS, defaults } from "chart.js/auto";
defaults.maintainAspectRatio = false;
defaults.responsive = true;
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SecureStore from "react-secure-storage";
import axios from "axios";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Table, Col, Row, Statistic, Space, Avatar } from "antd";
import DataTable from "react-data-table-component";
import { RiPassPendingLine } from "react-icons/ri";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const user = SecureStore.getItem("userToken");
  const navigateTo = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [rabbitCount, setRabbitCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [rabbit, setRabbit] = useState([]);
  const [clients, setClients] = useState([]);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: "Breed",
      selector: (row) => row.breed_type,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
  ];

  const adoption = [
    {
      name: "Adoption ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Adoption Date",
      selector: (row) => row.adoption_date,
      sortable: true,
      format: (row) => formatDate(row.adoption_date),
    },
    {
      name: "Status",
      selector: (row) => row.adoption_status,
      sortable: true,
    },
  ];

  const adoptData = {
    labels: adopt.map((item) => item.name),
    datasets: [
      {
        label: "Adopt",
        data: adopt.map((item) => item.Adopt),
        backgroundColor: "rgba(43, 63, 229, 0.8)",
      },
    ],
  };

  const salesData = {
    labels: monthSales.map((item) => item.name),
    datasets: [
      {
        label: "Sales",
        data: monthSales.map((item) => item.Sales),
        fill: false,
        tension: 0.1,
        borderColor: "rgba(50, 192, 19, 0.8)",
        backgroundColor: "rgba(50, 192, 19, 0.8)",
      },
    ],
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
          <div className="card-div" onClick={() => navigateTo("/breeding")}>
            <div className="card-inner">
              <h5>Upcoming</h5>
              <LuBell className="card_icon" />
            </div>
            <h5>42</h5>
          </div>
        </div>
        <div className="first-chart chart-div">
          <Bar data={adoptData} />
        </div>
        <div className="chart-div">
          <Line data={salesData} />
        </div>
        <div className="chart-div">
          <Doughnut
            data={{
              labels: ["A", "B", "C", "D", "E"],
              datasets: [
                {
                  label: "Revenue",
                  data: [200, 300, 150, 400, 250],
                  fill: false,
                  tension: 0.1,
                  backgroundColor: [
                    "rgba(43, 63, 229, 0.8)",
                    "rgba(250, 192, 19, 0.8)",
                    "rgba(50, 192, 19, 0.8)",
                    "rgba(253, 135, 135, 0.8)",
                  ],
                },
              ],
            }}
          />
        </div>
        {/* <ResponsiveContainer width="100%" height="75%">
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
        </ResponsiveContainer> */}

        <div className="activity">
          <div
            className="rabbit-added"
            style={{
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigateTo("/rabbits")}
          >
            <h6>Recent Added</h6>
            <div style={{ overflowX: "auto" }}>
              <DataTable
                columns={columns}
                data={rabbit}
                pagination={false}
                customStyles={tableHeaderStyle}
                highlightOnHover
              />
            </div>
          </div>
          <div
            className="recent-activity"
            style={{
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
            onClick={() => navigateTo("/request")}
          >
            <h6>Recent Adoption</h6>
            <div style={{ overflowX: "auto" }}>
              <DataTable
                columns={adoption}
                data={clients}
                pagination={false}
                customStyles={tableHeaderStyle}
                highlightOnHover
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
