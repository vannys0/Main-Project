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
  const [errMsg, setErrMsg] = useState(false);

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
      } else {
        setErrMsg(true);
        setTimeout(() => {
          setErrMsg(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setErrMsg(true);
    }
  };

  return (
    <div className="LoginSignup-div">
      <div className="main-container">
        <form onSubmit={handleVerify}>
          <h4>Verify your account</h4>
          <p>We've sent a verification code to your email</p>
          <div className="inputs">
            {errMsg && (
              <div
                className="alert alert-danger d-flex justify-content-center"
                role="alert"
              >
                Invalid verification code.
              </div>
            )}
            <div className="input">
              <input id="verificationCode" type="text" maxLength={6} required />
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
