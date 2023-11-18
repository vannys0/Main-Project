import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Pagination, Input } from "antd"; // Import Ant Design Table, Button, and Pagination
import axios from "axios";
import BreedingDetails from "./BreedingDetails";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Breeding() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [pageNumber, setPageNumber] = useState(1); // Ant Design Pagination starts from 1
  const itemsPerPage = 7;

  const pagesVisited = (pageNumber - 1) * itemsPerPage;
  const displayedData = data.slice(pagesVisited, pagesVisited + itemsPerPage);

  const totalItems = data.length;

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/breeding")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cancelled!", "You have been cancel this list.", "success");
        axios.delete(BASE_URL + "/cancel_breeding/" + id);
        window.location.reload();
      }
    });
  };

  const columns = [
    {
      title: "Male",
      dataIndex: "buck_id",
      key: "buck_id",
    },
    {
      title: "Female",
      dataIndex: "doe_id",
      key: "doe_id",
    },
    {
      title: "Pairing date",
      dataIndex: "pairing_date",
      key: "pairing_date",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="actions">
          <BreedingDetails data={record} />
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const { Search } = Input;
  const Filter = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    const filteredPair = data.filter((pair) =>
      pair.id.toString().toLowerCase().includes(lowerCaseValue)
    );
    setData(filteredPair);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <div className="d-flex align-items-center justify-content-between">
          <h3>Breeding List</h3>
          <Search
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
            }}
            placeholder="Search"
            allowClear
            size="large"
            onSearch={Filter}
          />
        </div>
        <div className="d-flex justify-content-end my-2">
          <Button type="primary" onClick={() => navigateTo("/add-breed-pair")}>
            Add
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={displayedData}
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
          total={totalItems}
          pageSize={itemsPerPage}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Breeding;
