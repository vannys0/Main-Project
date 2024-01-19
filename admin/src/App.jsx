import {
  createContext,
  useMemo,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Transactions from "./pages/Transactions";
import FamilyTree from "./pages/FamilyTree";

function App() {
  const signIn = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Login />
        </div>
      ),
    },
    {
      path: "/register",
      element: (
        <div>
          <Register />
        </div>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <div>
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/delivery",
      element: (
        <div>
          <PrivateRoute>
            <Delivery />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/clients",
      element: (
        <div>
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/rabbits",
      element: (
        <div>
          <PrivateRoute>
            <RabbitList />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/add-rabbit",
      element: (
        <div>
          <PrivateRoute>
            <AddRabbit />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/scan-rabbit",
      element: (
        <div>
          <PrivateRoute>
            <ScanRabbitQr />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/edit-rabbit/:id",
      element: (
        <div>
          <PrivateRoute>
            <EditRabbit />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/breeding",
      element: (
        <div>
          <PrivateRoute>
            <Breeding />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/add-breed-pair",
      element: (
        <div>
          <PrivateRoute>
            <AddBreedPair />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/add_breeding_child/:id",
      element: (
        <div>
          <PrivateRoute>
            <AddBreedingChild />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/request",
      element: (
        <div>
          <PrivateRoute>
            <Request />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/transactions",
      element: (
        <div>
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/family",
      element: (
        <div>
          <PrivateRoute>
            <FamilyTree />
          </PrivateRoute>
        </div>
      ),
    },
  ]);

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
        <RouterProvider router={router} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
