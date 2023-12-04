import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import SecureStore from "react-secure-storage";

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const verificationCode = document.getElementById("verificationCode").value;

    try {
      const response = await axios.post("http://localhost:8081/verify-otp", {
        verificationCode: verificationCode,
      });

      if (response.data.message === "OTP verified") {
        const token = response.data.token; // Assuming the token is sent from the backend upon successful verification
        authContext.signIn(user);
        SecureStore.setItem("userToken", token); // Set the token in SecureStore
        navigate("/home"); // Navigate to the home page after verification
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="LoginSignup-div bg-light">
      <form
        className="bg-white d-flex flex-column justify-content-center align-items-center px-5 py-4 gap-3"
        style={{ boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.3)" }}
      >
        <h2>Verify your account</h2>
        <p>We've sent a verification code to your email</p>
        <input
          id="verificationCode"
          type="text"
          className="form-control"
          placeholder="Verification code"
        />
        <button className="btn btn-success form-control" onClick={handleVerify}>
          Verify
        </button>
      </form>
    </div>
  );
}

export default Login;
