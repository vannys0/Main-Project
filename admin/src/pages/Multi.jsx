import React, { useState } from "react";
import axios from "axios";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath; // e.g., "http://localhost:8080/api"

function Multi() {
  const [name, setName] = useState("");
  const [values, setValues] = useState({
    fname: "",
    lname: "",
  });
  const [selectedFiles, setSelectedFiles] = useState(null);

  const onFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    console.log(files);
  };

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmmit = async () => {
    if (!selectedFiles) {
      console.error("Please select one or more files.");
      return;
    }

    let formData = new FormData();
    const postData = JSON.stringify(values);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("values", postData);
    alert(postData);

    try {
      const response = await axios.post(`${BASE_URL}/multi`, formData);
      alert("Done");
      console.log(response);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <form
        encType="multipart/form-data"
        className="w-50 flex flex-direction-column"
      >
        <input
          type="text"
          name="fname"
          className="form-control"
          placeholder="FName"
          onChange={handleInput}
        />
        <br />
        <input
          type="text"
          name="lname"
          className="form-control"
          placeholder="LName"
          onChange={handleInput}
        />
        <br />
        <input
          type="file"
          name="files"
          id="files"
          multiple
          className="form-control"
          onChange={onFileChange}
        />
        <br />
        <button type="button" className="btn btn-primary" onClick={onSubmmit}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default Multi;
