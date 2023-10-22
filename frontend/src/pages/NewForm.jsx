import axios from "axios";
import React, { useState } from "react";

function NewForm() {
  const [value, setValue] = useState({
    name: "",
  });

  const handleInput = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/newform", value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleInput}
          placeholder="Name"
          className="form-control"
        />
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}

export default NewForm;
