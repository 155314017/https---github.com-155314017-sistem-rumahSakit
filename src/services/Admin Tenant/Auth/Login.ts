import axios from "axios";

// interface LoginResponse {
//   responseCode: string;
//   statusCode: string;
//   message: string;
//   data: {
//     id: string;
//     masterUserId: string;
//     tokenValue: string;
//     refreshTokenValue: string;
//     expDate: number;
//     expRefreshTokenDate: number;
//     oneTimeUse: boolean;
//     used: null | string;
//     updatedBy: null | string;
//     updatedDateTime: null | string;
//     createdBy: null | string;
//     createdDateTime: null | string;
//     deletedBy: null | string;
//     deletedDateTime: null | string;
//   };
// }

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

    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export default Login;
