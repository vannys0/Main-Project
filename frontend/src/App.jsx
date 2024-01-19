import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Adopt from "./pages/Adopt.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import MyApplication from "./pages/MyApplication.jsx";
import "./App.css";
import EmailVerification from "./pages/EmailVerification.jsx";
import {
  createContext,
  useMemo,
  useEffect,
  useReducer,
  useContext,
} from "react";
export const AuthContext = createContext(null);
import SecureStore from "react-secure-storage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const signIn = useContext(AuthContext);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isSignOut: false,
      userToken: SecureStore.getItem("userToken"),
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: (data) => {
        SecureStore.setItem("userToken", data);
        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: () => {
        SecureStore.clear();
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  useEffect(() => {
    if (!state.userToken) {
      let userToken = SecureStore.getItem("userToken");
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    }
  }, [state.userToken]);

  return (
    <AuthContext.Provider value={authContext}>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={state.userToken ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/signup"
              element={state.userToken ? <Navigate to="/home" /> : <Signup />}
            />
            <Route
              path="/signup/verify_account"
              element={
                state.userToken ? (
                  <Navigate to="/home" />
                ) : (
                  <EmailVerification />
                )
              }
            />
            <Route
              path="/home"
              element={state.userToken ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/adopt"
              element={state.userToken ? <Adopt /> : <Navigate to="/" />}
            />
            <Route
              path="/contact"
              element={state.userToken ? <Contact /> : <Navigate to="/" />}
            />
            <Route
              path="/about"
              element={state.userToken ? <About /> : <Navigate to="/" />}
            />
            <Route
              path="/myapplication"
              element={
                state.userToken ? (
                  <MyApplication />
                ) : (
                  <Navigate to="/myapplication" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
