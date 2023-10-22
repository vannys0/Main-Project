import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import ViewApplication from "./ViewApplication";
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
    try {
      await axios.delete("http://localhost:8081/delete_application/" + id);
      window.location.reload();
      toast.success("Successfully deleted!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-div">
      <Navbar />
      <div className="application-div">
        <h1>May application</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Application_Id</th>
              <th>Rabbit_Id</th>
              <th>Application date</th>
              <th>Reason for adoption</th>
              <th>Service Option</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {values.map((data, i) => (
              <tr key={i}>
                <td width={100}>{data.id}</td>
                <td>{data.rabbit_id}</td>
                <td width={100}>{data.adoption_date}</td>
                <td>{data.reason_for_adoption}</td>
                <td width={100}>{data.service_option}</td>
                <td width={100}>
                  {data.transaction_status === "COMPLETE" ? (
                    <span style={{ color: "green" }}>
                      {data.transaction_status}
                    </span>
                  ) : (
                    <span style={{ color: "black" }}>
                      {data.transaction_status}
                    </span>
                  )}
                </td>
                <td className="action-btn">
                  <ViewApplication data={data} />
                  {data.transaction_status === "PENDING" ? (
                    <button class="danger" onClick={(e) => handleDelete(data.id)}>
                      Cancel
                    </button>
                  ) : (
                    <span style={{ color: "black" }}>
                    </span>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MyApplication;
