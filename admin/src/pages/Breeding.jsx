import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Pagination, Input } from "antd";
import axios from "axios";
import BreedingDetails from "./BreedingDetails";
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
  const [filtered, setFiltered] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 6;

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

  const renderActions = (text, record) => {
    const estimatedDueDate = new Date(record.expected_due_date);
    const today = new Date();

    const differenceInDays = Math.floor(
      (estimatedDueDate - today) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays <= 0) {
      return (
        <div className="actions">
          <BreedingDetails data={record} />
          <Button
            onClick={async () => {
              return navigateTo(`/add_breeding_child/${record.id}`, { state: await stateValue(record) });
            }}
          >
            Add Litters
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            disabled
          >
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <div className="actions">
          <BreedingDetails data={record} />
          <Button
            onClick={() => navigateTo(`/add_breeding_child/${record.id}`, { state: record })}
            disabled
          >
            Add Litters
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.id)}>
            Cancel
          </Button>
        </div>
      );
    }
  };

  async function stateValue(record){
    const rabbit = await fetchBreedPair(record);
    console.log(rabbit);

    const combineBreedType = rabbit.buck.breed_type + "-" + rabbit.doe.breed_type;
    const breeds = [...breedType, combineBreedType];

    const state = {
      adoption: record,
      breedTypes: breeds,
      currentBreed: combineBreedType
    }

    return state;
  }

  const fetchBreedPair = async (record) => {
    let buck = await axios.get(BASE_URL + "/rabbit/" + record.buck_id);
    let doe = await axios.get(BASE_URL + "/rabbit/" + record.doe_id);

    const rabbitPair = {
      buck: buck.data[0],
      doe: doe.data[0]
    }
  
    return rabbitPair;
  }

  const columns = [
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Pairing date",
      dataIndex: "pairing_date",
      key: "pairing_date",
      render: (pairingDate) => {
        const formattedPairingDate = new Date(pairingDate).toLocaleDateString();
        return <span>{formattedPairingDate}</span>;
      },
    },
    {
      title: "Estimated due",
      dataIndex: "expected_due_date",
      key: "expected_due_date",
      render: (dueDate) => {
        const formattedDueDate = new Date(dueDate).toLocaleDateString();
        return <span>{formattedDueDate}</span>;
      },
    },
    {
      title: "Actions",
      key: "action",
      render: renderActions,
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
        <div className="tables">
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
