import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const user = SecureStore.getItem("userToken");

  const [userCount, setUserCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [rabbitCount, setRabbitCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [pairCount, setPairCount] = useState(0);
  const [approveCount, setApproveRequest] = useState(0);

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
      .get(BASE_URL + "/requestCount")
      .then((response) => {
        setRequestCount(response.data[0].requestCount);
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

    //see dashboard.js
    axios
      .get(BASE_URL + "/pending-adoption")
      .then((response) => {
        setPending(response.data[0].pending);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/pairCount")
      .then((response) => {
        setPairCount(response.data[0].pairCount);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(BASE_URL + "/approveCount")
      .then((response) => {
        setApproveRequest(response.data[0].approveCount);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(BASE_URL + "/pairCount")
      .then((response) => {
        setPairCount(response.data[0].pairCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "May",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3490,
      pv: 5033,
      amt: 2023,
    },
    {
      name: "Sep",
      uv: 1405,
      pv: 3227,
      amt: 2000,
    },
    {
      name: "Oct",
      uv: 2210,
      pv: 3402,
      amt: 1875,
    },
    {
      name: "Nov",
      uv: 2333,
      pv: 2307,
      amt: 3012,
    },
    {
      name: "Dec",
      uv: 1006,
      pv: 1123,
      amt: 2342,
    },
  ];

  const navigateTo = useNavigate();

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>

        <div className="main-cards">
          <div className="card" onClick={(e) => navigateTo("/clients")}>
            <div className="card-inner">
              <h3>CLIENTS</h3>
              <BsPeopleFill className="card_icon" />
            </div>
            <h1>{userCount}</h1>
          </div>

          <div className="card" onClick={() => navigateTo("/request")}>
            <div className="card-inner">
              <h3>PENDING</h3>
              <BsFillGrid3X3GapFill className="card_icon" />
            </div>
            <h1>{pending}</h1>
          </div>
          <div className="card" onClick={(e) => navigateTo("/rabbits")}>
            <div className="card-inner">
              <h3>RABBITS</h3>
              <BsFillArchiveFill className="card_icon" />
            </div>
            <h1>{rabbitCount}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>UPCOMING</h3>
              <BsFillBellFill className="card_icon" />
            </div>
            <h1>42</h1>
          </div>
        </div>

        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              style={{ height: "300px" }}
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              style={{ height: "300px" }}
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
