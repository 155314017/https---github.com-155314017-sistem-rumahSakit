/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const Login = async (email: string, password: string) => {
  try {
    console.log("inside Login");
    const response = await axios.post(
      // "https://hms.3dolphinsocial.com:8083/v1/auth/login",
      "https://hms.3dolphinsocial.com:8083/login",
      // "http://34.128.99.52:8081/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("inside Login1 ");

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export default Login;
