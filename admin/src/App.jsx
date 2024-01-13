import {
  createContext,
  useMemo,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
export const AuthContext = createContext(null);
import SecureStore from "react-secure-storage";
import PrivateRoute from "./pages/PrivateRoute";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import RabbitList from "./pages/RabbitList";
import Delivery from "./pages/Delivery";
import Breeding from "./pages/Breeding";
import Request from "./pages/Request";
import AddRabbit from "./pages/AddRabbit";
import EditRabbit from "./pages/EditRabbit";
import AddBreedPair from "./pages/AddBreedPair";
import AddBreedingChild from "./pages/AddBreedingChild";
import Clients from "./pages/Clients";
import ScanRabbitQr from "./pages/ScanRabbitQr";

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
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route
              path="/"
              element={state.userToken ? <Navigate to="/dashboard" /> : <Login />}
            />
          <Route
              path="/register"
              element={state.userToken ? <Navigate to="/dashboard" /> : <Register />}
            />
          <Route
              path="/dashboard"
              element={state.userToken ? <Dashboard /> : <Navigate to="/" />}
            />
          <Route
              path="/rabbits"
              element={state.userToken ? <RabbitList /> : <Navigate to="/" />}
            />
          <Route
              path="/scan-rabbit"
              element={state.userToken ? <ScanRabbitQr /> : <Navigate to="/" />}
            />
          <Route
              path="/add-rabbit"
              element={state.userToken ? <AddRabbit /> : <Navigate to="/" />}
            />
          <Route
              path="/edit-rabbit/:id"
              element={state.userToken ? <EditRabbit /> : <Navigate to="/" />}
            />
          <Route
              path="/breeding"
              element={state.userToken ? <Breeding /> : <Navigate to="/" />}
            />
          <Route
              path="/add-breed-pair"
              element={state.userToken ? <AddBreedPair /> : <Navigate to="/" />}
            />
          <Route
              path="/add-breeding-child/:id"
              element={state.userToken ? <AddBreedingChild /> : <Navigate to="/" />}
            />
          <Route
              path="/request"
              element={state.userToken ? <Request /> : <Navigate to="/" />}
            />
          <Route
              path="/delivery"
              element={state.userToken ? <Delivery /> : <Navigate to="/" />}
            />
          <Route
              path="/clients"
              element={state.userToken ? <Clients /> : <Navigate to="/" />}
            />
        </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
