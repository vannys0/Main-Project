import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
function RabbitList() {
  const [rabbits, setRabbits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/rabbitlist")
      .then((res) => setRabbits(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="mt-5">
      <h2>Rabbit List</h2>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Weight</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rabbits.map((data, i) => (
            <tr key={i}>
              <td>{data.rabbit_id}</td>
              <td>{data.name}</td>
              <td>{data.age}</td>
              <td>{data.sex}</td>
              <td>{data.weight}</td>
              <td>
                <button className="btn btn-success m-2">Edit</button>
                <button className="btn btn-primary m-2">Rehome</button>
                <button className="btn btn-danger m-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RabbitList;
