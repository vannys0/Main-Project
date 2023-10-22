import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import RabbitList from "./RabbitList.jsx";

function AddRabbit() {
  const [values, setValues] = useState({
    name: "",
    age: "",
    sex: "",
    weight: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8081/addrabbit", values)
      .then((res) => {
        alert("Rabbit Added!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-center">Add a Rabbit</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label for="">Rabbit name :</label>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          className="form-control"
          required
        />
        <label for="">Age (months) :</label>
        <input
          type="number"
          name="age"
          onChange={handleInput}
          className="form-control"
          required
        />
        <br />
        <label for="">Sex :</label>
        <Form.Select
          aria-label="Default select example"
          onChange={handleInput}
          name="sex"
        >
          <option>Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
        <br />
        <label for="">Weight (klg) :</label>
        <input
          type="number"
          name="weight"
          onChange={handleInput}
          className="form-control"
          required
        />

        <button className="btn btn-primary mt-2">Add</button>
      </form>
      <RabbitList />
    </div>
  );
}

export default AddRabbit;
