import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    // console.log("TOKEN di PrivateRoute:", token);
    
    // const token = 'token';
    const token = sessionStorage.getItem("accessToken");
    console.log("TOKEN DI PRIVATE: ", token)

    if (!token) {
        console.log("Token tidak ditemukan, mengalihkan ke halaman login.");
        return <Navigate to="/" />;
    }

    console.log("Token ditemukan, melanjutkan ke dashboard.");
    return <Outlet />;
};

export default PrivateRoute;
