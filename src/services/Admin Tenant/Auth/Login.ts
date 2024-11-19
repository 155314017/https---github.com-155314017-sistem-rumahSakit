/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

interface CustomError extends Error {
  responseCode?: number;
}

const Login = async (email: string, password: string) => {
  try {
    console.log("inside Login");
    const response = await axios.post(
      "https://hms.3dolphinsocial.com:8083/v1/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("inside Login1 ");
    console.log("akses token", response.data.data.tokenValue); // Access the token from the response

    // Save the token in cookies
    Cookies.set("accessToken", response.data.data.tokenValue, { expires: 7 }); // Expires in 7 days
    Cookies.set("name", response.data.data.name, { expires: 7 });

    return response.data;
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || "Login failed"
    );

    customError.responseCode = error.response?.status;
    throw customError;
  }
};

export default Login;
