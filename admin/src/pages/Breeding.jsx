import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Pagination, Input, Dropdown, Space } from "antd";
import DataTable from "react-data-table-component";
import { SlOptionsVertical } from "react-icons/sl";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import BreedingDetails from "./BreedingDetails";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;
import { breedType } from "./API/RabbitApi";

function Breeding() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/breeding")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      text: "Are you sure you want to cancel this breeding pair?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
        axios.delete(BASE_URL + "/cancel_breeding/" + id);
        window.location.reload();
      }
    });
  };

  function calculateDifferenceInDays(pairingDate) {
    const today = new Date();
    const differenceInDays = Math.floor(
      (today - new Date(pairingDate)) / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  }

  const renderActions = (text, record) => {
    const pairingDate = new Date(record.pairing_date);
    const today = new Date();
    const differenceInDays = Math.floor(
      (today - pairingDate) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays > 30) {
      return (
        <a
          onClick={async () => {
            return navigateTo(`/add_breeding_child/${record.id}`, {
              state: await stateValue(record),
            });
          }}
        >
          Add Litters
        </a>
      );
    } else {
      return <a disabled>Add Litters</a>;
    }
  };

  const items = (record) => {
    const differenceInDays = calculateDifferenceInDays(record.pairing_date);
  
    return [
      {
        label: <BreedingDetails data={record} />,
        key: "0",
      },
      {
        label: renderActions(null, record, differenceInDays),
        key: "1",
      },
      {
        label: differenceInDays > 30 ? (
          <span onClick={() => handleDelete(record.id)}>Delete</span>
        ) : (
          <span onClick={() => handleDelete(record.id)}>Cancel</span>
        ),
        key: "2",
        danger: true,
      },
    ];
  };
  

  async function stateValue(record) {
    const rabbit = await fetchBreedPair(record);
    console.log(rabbit);

    const combineBreedType =
      rabbit.buck.breed_type + "-" + rabbit.doe.breed_type;
    const breeds = [...breedType, combineBreedType];

    const state = {
      adoption: record,
      breedTypes: breeds,
      currentBreed: combineBreedType,
    };

    return state;
  }

  const fetchBreedPair = async (record) => {
    let buck = await axios.get(BASE_URL + "/rabbit/" + record.buck_id);
    let doe = await axios.get(BASE_URL + "/rabbit/" + record.doe_id);

    const rabbitPair = {
      buck: buck.data[0],
      doe: doe.data[0],
    };

    return rabbitPair;
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
      name: "Pair Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: "Pairing date",
      selector: (row) => row.pairing_date,
      sortable: true,
      format: (row) =>
        new Date(row.pairing_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      name: "Estimated due",
      selector: (row) => row.expected_due_date,
      sortable: true,
      format: (row) =>
        new Date(row.expected_due_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      name: "Actions",
      cell: (row) => (
        <Dropdown
          menu={{
            items: items(row),
          }}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <a onClick={(e) => e.preventDefault()}>
            <SlOptionsVertical style={{ color: "#1e1e1e" }} />
          </a>
        </Dropdown>
      ),
    },
  ];

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredPairs = data.filter((pair) =>
      pair.id.toString().toLowerCase().includes(value)
    );
    setFilteredData(filteredPairs);
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
          <Input
            style={{
              height: "40px",
              fontSize: "16px",
              width: "400px",
            }}
            placeholder="Search by ID"
            allowClear
            size="large"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="d-flex justify-content-end my-3">
          <div
            className="btn-add"
            onClick={() => navigateTo("/add-breed-pair")}
          >
            <IoMdAdd />
          </div>
        </div>
        <div className="tables">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            customStyles={tableHeaderStyle}
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default Breeding;
