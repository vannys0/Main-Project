import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import "./style.css";
import Rabbit from "../images/rabbit-contact.png";
import Footer from "../components/footer.jsx";
import axios from "axios";

import SecureStore from "react-secure-storage";

function SimpleChat() {
    const user = SecureStore.getItem("userToken");
    const [msgs, setMsgs] = useState([]);

    const [values, setValues] = useState({
        user_id: user.id,
        message: "",
        type: "Admin"
    });

    useEffect(() => {
        axios
            .get("http://localhost:8081/api/chat/" + user.id)
            .then((res) => {
                console.log(res.data);
                setMsgs(res.data)
            })
            .catch((err) => console.log(err));


    }, []);

    const handleInput = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8081/api/chat", values)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className="main-div">
            <Navbar />
            <div className="contact-div">
                <h2 className="send-us">Chat us</h2>
                <br />

                <form onSubmit={handleSubmit}>

                    Messages<span className="errmsg">*</span>
                    <textarea
                        name="msg"
                        rows={2}
                        cols={100}
                        className="form-control"
                        onChange={handleInput}
                        value={msgs}
                        required
                    />


                    <input
                        type="text"
                        name="message"
                        className="form-control"
                        required
                        onChange={handleInput}
                    />
                    <button type="submit" className="btn btn-primary">
                        Apply
                    </button>

                </form>

            </div>
            <Footer />
            <img src={Rabbit} alt="" className="rabbit-contact" />
        </div>
    );
}

export default SimpleChat;
