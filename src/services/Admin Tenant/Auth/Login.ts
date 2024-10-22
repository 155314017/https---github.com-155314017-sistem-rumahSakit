import axios from "axios";

const Login = async (email: string, password: string) => {
  console.log("login catch");
  try {
    console.log("inside try");
    const response = await axios.post(
      // "http://34.128.99.52:8081/login",
      "https://hms.3dolphinsocial.com:8083/v1/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );
    console.log("ready to return");
    return response.data;
  } catch (error) {
    console.log("eror nya karna:", error)
    console.error("API error:", error);
    throw error;
  }
};

export default Login;
