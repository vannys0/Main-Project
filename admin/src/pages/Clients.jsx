import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import "../Style.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Clients() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [clients, setClients] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const clientsPerPage = 10;

  useEffect(() => {
    axios
      .get(BASE_URL + "/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const pagesVisited = pageNumber * clientsPerPage;
  const displayedClients = clients.slice(
    pagesVisited,
    pagesVisited + clientsPerPage
  );

  const pageCount = Math.ceil(clients.length / clientsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container">
        <h3>CLIENTS</h3>
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th>Client Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {displayedClients.map((data, i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}

export default Clients;
