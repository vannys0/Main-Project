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
              <div className="alert alert-danger" role="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Incorrect verification code.
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
