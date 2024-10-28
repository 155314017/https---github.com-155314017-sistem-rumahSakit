import axios from "axios";

interface CustomError extends Error {
  responseCode?: number;
}

const ResetPassword = async (email: string) => {
  try {
    console.log("Sending reset password request for:", email);
    const response = await axios.post(
      "https://hms.3dolphinsocial.com:8083/v1/auth/temporary-token-request",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; 
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || "Login failed"
    );
    customError.responseCode = error.response?.status;
    throw customError; 
  }
};

export default ResetPassword;
