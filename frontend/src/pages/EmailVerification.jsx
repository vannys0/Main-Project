import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import axios from "axios";
import { AuthContext } from "../App";
import SecureStore from "react-secure-storage";
import appConfig from "../../config.json";
const BASE_URL = appConfig.apiBasePath;

function Login() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const verificationCode = document.getElementById("verificationCode").value;

    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, {
        verificationCode: verificationCode,
      });
      if (response.data.is_verified) {
        const user = response.data;
        authContext.signIn(user);
        SecureStore.setItem("userToken", user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="LoginSignup-div">
      <div className="main-container">
        <form onSubmit={handleVerify}>
          <h3 className="brand-name">eLeporidae</h3>
          <h4>Verify your account</h4>
          <p>We've sent a verification code to your email</p>
          <div className="inputs">
            <div className="input">
              <input id="verificationCode" type="text" required />
              <label htmlFor="">Enter Verification Code</label>
            </div>
          </div>
          <button type="submit" className="verify-btn">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
