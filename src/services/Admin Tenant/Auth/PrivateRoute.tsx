import { Outlet, Navigate } from 'react-router-dom';
import Cookies from "js-cookie"; 

const PrivateRoute = () => {
    // console.log("TOKEN di PrivateRoute:", token);
    
    // const token = 'token';
    // const token = sessionStorage.getItem("accessToken");
    const token = Cookies.get("accessToken");
    console.log("TOKEN DI PRIVATE: ", token)

    if (!token) {
        console.log("Token tidak ditemukan, mengalihkan ke halaman login.");
        return <Navigate to="/" />;
    }

    console.log("Token ditemukan, melanjutkan ke dashboard.");
    return <Outlet />;
};

export default PrivateRoute;
