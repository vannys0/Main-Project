import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import Rabbit from "../images/rabbit-contact.png";
import Footer from "../components/footer.jsx";
import axios from "axios";

function UploadFile() {

    const [file, setFile] = useState();

    const upload = () => {
        const formData = new FormData();
        formData.append('image', file);
        axios
            .post("http://localhost:8081/api/upload-file", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="main-div">
            <Navbar />
            <div className="contact-div">

                <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                <button onClick={upload}>Submit</button>

            </div>
            <Footer />
            <img src={Rabbit} alt="" className="rabbit-contact" />
        </div>
    );
}

export default UploadFile;
