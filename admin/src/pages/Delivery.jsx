import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../Style.css";
import { SlOptionsVertical } from "react-icons/sl";
import { Table, Button, Pagination, Tag, Dropdown, Space } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Delivery() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [values, setValues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 6;

  const pagesVisited = (pageNumber - 1) * itemsPerPage;
  const displayedValues = values.slice(
    pagesVisited,
    pagesVisited + itemsPerPage
  );

  const totalItems = values.length;

  const handlePageChange = (page, pageSize) => {
    setPageNumber(page);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/adoptions-deliver")
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onApprove = (e, o) => {
    axios
      .put(BASE_URL + "/approve-delivery/" + o.id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const onDelivered = (id) => {
    const payload = {
      id: uuidv4(),
      adoption_id: id,
      transaction_date: new Date().toISOString(),
      transaction_status: "Completed",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "you want to confirm delivery?",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${BASE_URL}/delivered`, payload)
          .then((res) => {
            window.location.reload();
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const items = (record) => [
    record.delivery_status === "Approved"
      ? {
          label: <span>Deliver</span>,
          key: "0",
          disabled: true,
        }
      : {
          label: <span onClick={(e) => onApprove(e, record)}>Deliver</span>,
          key: "0",
        },
    record.delivery_status === "Approved"
      ? {
          label: <span onClick={() => onDelivered(record.id)}>Delivered</span>,
          key: "1",
        }
      : {
          label: <span>Delivered</span>,
          key: "1",
          disabled: true,
        },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Contact number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) => (
        <span>
          {record.barangay}, {record.city}, {record.province}
        </span>
      ),
    },
    {
      title: "Delivery Status",
      key: "delivery_status",
      render: (text, record) => (
        <span>
          {record.delivery_status === "Approved" ? (
            <Tag color="success">Approved</Tag>
          ) : (
            <Tag color="warning">Pending</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Dropdown
          menu={{
            items: items(record),
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SlOptionsVertical style={{ color: "#1e1e1e" }} />
            </Space>
          </a>
        </Dropdown>
      ),
      // render: (text, record) =>
      //   record.delivery_status === "Approved" ? (
      //     <div className="d-flex gap-2">
      //       <Button type="primary" disabled>
      //         Deliver
      //       </Button>
      //       <Button type="primary" onClick={() => onDelivered(record.id)}>
      //         Delivered
      //       </Button>
      //     </div>
      //   ) : (
      //     <div className="d-flex gap-2">
      //       <Button type="primary" onClick={(e) => onApprove(e, record)}>
      //         Deliver
      //       </Button>
      //       <Button type="primary" disabled>
      //         Delivered
      //       </Button>
      //     </div>
      //   ),
    },
  ];

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Delivery {values.id}</h3>

        <div className="tables">
          <Table
            columns={columns}
            dataSource={displayedValues}
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

export default Delivery;
