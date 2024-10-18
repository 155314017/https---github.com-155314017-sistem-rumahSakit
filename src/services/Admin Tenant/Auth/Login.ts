import axios from "axios";

const Login = async (email: string, password: string) => {
  console.log("login catch");
  try {
    console.log("inside try");
    const response = await axios.post(
      "https://hms.3dolphinsocial.com:8083/auth/login",
      {
        email,
        password,
      }, {
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );
    console.log("ready to return");
    return response.data;
  } catch (error) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log("eror nya karna:", error)
    console.error("API error:", error);
    throw error;
  }
};

export default Login;
