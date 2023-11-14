import {
  createContext,
  useMemo,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
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
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import AdminProfile from "./pages/AdminProfile";
// import Scanner from "./pages/Scanner";
import ClientProfile from "./pages/Profile/ClientProfile";
import RabbitSale from "./pages/RabbitSale";

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
      path: "/profile",
      element: (
        <div>
          <PrivateRoute>
            <AdminProfile />
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
      path: "/client-profile/:id",
      element: (
        <div>
          <PrivateRoute>
            <ClientProfile />
          </PrivateRoute>
        </div>
      ),
    },
    {
      path: "/calendar",
      element: (
        <div>
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        </div>
      ),
    },
    // {
    //   path: "/scanner",
    //   element: (
    //     <div>
    //       <PrivateRoute>
    //         <Scanner />
    //       </PrivateRoute>
    //     </div>
    //   ),
    // },

    // {
    //   path: "/rabbit-sales",
    //   element: (
    //     <div>
    //         <RabbitSale />
    //     </div>
    //   ),
    // },
  ]);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          console.log("----RESTORE_TOKEN----");
          return {
            ...prevState,
            userToken: action.token,
          };
        case "SIGN_IN":
          console.log("----SIGN_IN----");
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          console.log("----SIGN_OUT----");
          return {
            ...prevState,
            isSignOut: true,
            userToken: null,
          };
      }
    },
    {
      isSignOut: false,
      userToken: null,
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
    console.log("---------START APP USE EFFECT---------");
    let userToken = SecureStore.getItem("userToken");
    dispatch({ type: "RESTORE_TOKEN", token: userToken });
    console.log("---------END APP USE EFFECT---------");
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
