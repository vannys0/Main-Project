import { Navigate } from "react-router-dom";
import SecureStore from "react-secure-storage";


const PrivateRoute = ({ children }) => {
  const user = SecureStore.getItem("userToken");
  const isLoggedIn = user !== null;


  return isLoggedIn ? <Navigate to="/home" /> : children;
};


export default PrivateRoute;