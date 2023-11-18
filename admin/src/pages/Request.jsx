import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Style.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ReviewRequest from "./ReviewRequest";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Table, Tag, Space, Pagination } from "antd";
import Swal from "sweetalert2";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Request() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const navigateTo = useNavigate();
  const [values, setValues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const itemsPerPage = 6;

  const onApprove = (e, o) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approved this request?",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Approved!", "Request has been approved.", "success");
        axios
          .put(BASE_URL + "/approve-adoption/" + o.id)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const onDecline = (e, o) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to decline this request?",
      input: "text",
      inputPlaceholder: "Comment",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes, decline it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Declined!", "Request has been declined.", "success");
        axios
          .put(BASE_URL + "/decline-adoption/" + o.id, {
            comment: result.value,
          })
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/adoptions")
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handlePageChange = (page) => {
    setPageNumber(page);
  };

  const getDisplayedData = () => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return values.slice(startIndex, endIndex);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <h3>Adoption request</h3>
        <div style={{ overflowX: "auto" }}>
          <Table dataSource={getDisplayedData()} pagination={false}>
            <Table.Column title="Name" dataIndex="fullname" key="name" />
            <Table.Column
              title="Address"
              key="address"
              render={(text, record) => (
                <span>
                  {record.barangay}, {record.city}, {record.province}
                </span>
              )}
            />
            <Table.Column title="Date" dataIndex="adoption_date" key="date" />
            <Table.Column
              title="Mode of Delivery"
              dataIndex="service_option"
              key="service_option"
            />
            <Table.Column
              title="Status"
              dataIndex="transaction_status"
              key="transaction_status"
              render={(text, record) => (
                <span>
                  {record.transaction_status === "Pending" ? (
                    <Tag color="warning">{record.transaction_status}</Tag>
                  ) : record.transaction_status === "Declined" ? (
                    <Tag color="error">{record.transaction_status}</Tag>
                  ) : (
                    <Tag color="success">{record.transaction_status}</Tag>
                  )}
                </span>
              )}
            />
            <Table.Column title="Comment" dataIndex="comment" key="comment" />
            <Table.Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space>
                  <ReviewRequest data={record} />
                  {record.transaction_status === "Pending" ? (
                    <Button
                      type="primary"
                      onClick={(e) => onApprove(e, record)}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button type="primary" disabled>
                      Approve
                    </Button>
                  )}
                  {record.transaction_status === "Pending" ? (
                    <Button
                      type="primary"
                      danger
                      onClick={(e) => onDecline(e, record)}
                    >
                      Decline
                    </Button>
                  ) : (
                    <Button type="primary" disabled>
                      Decline
                    </Button>
                  )}
                </Space>
              )}
            />
          </Table>
        </div>
        <Pagination
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
          current={pageNumber}
          pageSize={itemsPerPage}
          total={values.length}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Request;
