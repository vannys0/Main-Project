import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import "../Style.css";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Clients() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>CLIENTS</h3>
        <Table bordered hover responsive="sm">
          <thead>
            <tr>
              <th>Client Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((data, i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Clients;
