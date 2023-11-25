import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ViewApplication from "./ViewApplication";
import { Button, Tag, Table } from "antd"; // Import Table from antd
import Swal from "sweetalert2";
import SecureStore from "react-secure-storage";

function MyApplication() {
  const { id } = useParams();
  const [values, setValues] = useState([]);
  const user = SecureStore.getItem("userToken");

  useEffect(() => {
    axios
      .get("http://localhost:8081/myapplication/" + user.id)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you want to cancel this?",
      showCancelButton: true,
      confirmButtonColor: "#d50000",
      cancelButtonColor: "#797979",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Successful!", "You have cancelled the request", "success");
        axios.delete("http://localhost:8081/delete_application/" + id);
        window.location.reload();
      }
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "adoption_date",
      key: "adoption_date",
      render: (text) => formatDate(text),
    },
    {
      title: "Delivery Option",
      dataIndex: "service_option",
      key: "service_option",
    },
    {
      title: "Status",
      dataIndex: "transaction_status",
      key: "transaction_status",
      render: (text) => {
        let color = "";
        if (text === "Pending") color = "warning";
        else if (text === "Declined") color = "error";
        else color = "success";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="d-flex gap-2">
          <ViewApplication data={record} />
          {record.transaction_status === "Pending" ? (
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.id)}
            >
              Cancel
            </Button>
          ) : (
            <span style={{ color: "black" }}></span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="main-div">
      <Navbar />
      <div className="application-div">
        <h4>Recent Adoption</h4>
        <br />
        <Table
          dataSource={values}
          columns={columns}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
}

export default MyApplication;
