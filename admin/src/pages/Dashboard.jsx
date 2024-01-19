import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsFillBellFill,
} from "react-icons/bs";
import { LuUsers, LuBell } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";
import { Chart as ChartJS, defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 18;
defaults.plugins.title.color = "rgba(0, 0, 0, 0.75)";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SecureStore from "react-secure-storage";
import axios from "axios";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { Tag } from "antd";
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
  const [breeding, setBreeding] = useState(0);
  const [monthSales, setMonthSales] = useState([]);
  const [adopt, setAdopt] = useState([]);
  const [adoptedBySex, setAdoptedBySex] = useState([]);

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
      .get(BASE_URL + "/pairCount")
      .then((res) => {
        setBreeding(res.data[0].pairCount);
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

    axios
      .get(BASE_URL + "/adopted-by-sex")
      .then((response) => {
        setAdoptedBySex(response.data);
      })
      .catch((error) => {
        console.error("Error fetching adopted rabbits by sex:", error);
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
        textTransform: "uppercase",
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
      name: "Gender",
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
      selector: (row) => (
        <span style={{ textTransform: "uppercase" }}>
          {row.adoption_status === "Approved" ? (
            <Tag color="success">{row.adoption_status}</Tag>
          ) : row.adoption_status === "Pending" ? (
            <Tag color="warning">{row.adoption_status}</Tag>
          ) : (
            <Tag color="error">{row.adoption_status}</Tag>
          )}
        </span>
      ),
      sortable: true,
    },
  ];

  const adoptData = {
    labels: adopt.map((item) => item.name),
    datasets: [
      {
        label: "Adoptions",
        data: adopt.map((item) => item.Adopt),
        backgroundColor: "rgba(43, 63, 229, 0.8)",
      },
    ],
  };

  const salesData = {
    labels: monthSales.map((item) => item.name),
    datasets: [
      {
        label: "Adoption Revenue",
        data: monthSales.map((item) => item.Sales),
        fill: false,
        tension: 0.1,
        borderColor: "rgba(50, 192, 19, 0.8)",
        backgroundColor: "rgba(50, 192, 19, 0.8)",
      },
    ],
  };

  const adoptDataBySex = {
    labels: adoptedBySex.map((item) => item.sex || ""),
    datasets: [
      {
        label: "Adopted Rabbits by Sex",
        data: adoptedBySex.map((item) => item.count_adopted_rabbits || 0),
        backgroundColor: ["rgba(253, 135, 135, 0.8)", "rgba(43, 63, 229, 0.8)"],
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
              <h5>Breeding Pair</h5>
              <BsListCheck className="card_icon" />
            </div>
            <h5>{breeding}</h5>
          </div>
        </div>
        <div className="first-chart chart-div">
          {adoptData.labels.length === 0 ||
          adoptData.datasets[0].data.every((dataPoint) => dataPoint === 0) ? (
            <p>No data available for the chart</p>
          ) : (
            <Bar
              data={adoptData}
              options={{
                plugins: {
                  title: {
                    text: "ADOPTIONS",
                  },
                },
              }}
            />
          )}
        </div>
        <div className="chart-div">
          {salesData.labels.length === 0 ||
          salesData.datasets[0].data.every((dataPoint) => dataPoint === 0) ? (
            <p>No data available for the chart</p>
          ) : (
            <Line
              data={salesData}
              options={{
                plugins: {
                  title: {
                    text: "ADOPTION REVENUE",
                  },
                },
              }}
            />
          )}
        </div>
        <div className="chart-div">
          {!adoptDataBySex.labels.length ? (
            <p>No data available for the chart</p>
          ) : (
            <Doughnut
              data={adoptDataBySex}
              options={{
                plugins: {
                  title: {
                    text: "ADOPTED RABBIT BY GENDER",
                  },
                },
              }}
            />
          )}
        </div>
        <div className="activity">
          <div
            className="rabbit-added"
            style={{
              width: "100%",
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
              width: "100%",
              boxShadow:
                "rgba(99, 99, 99, 0.2) 0px 2px 4px 0px, rgba(99, 99, 99, 0.1) 0px -2px 8px 0px",
              padding: "10px",
              backgroundColor: "#ffffff",
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
