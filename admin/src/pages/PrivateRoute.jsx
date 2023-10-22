import { Navigate } from "react-router-dom";
import SecureStore from "react-secure-storage";


const PrivateRoute = ({children}) => {
    const user = SecureStore.getItem("userToken");
    return user ? children : <Navigate to="/"/>;
}

export default PrivateRoute;