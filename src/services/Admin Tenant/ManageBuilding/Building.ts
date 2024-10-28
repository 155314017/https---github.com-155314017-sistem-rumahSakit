import axios from "axios";

interface CustomError extends Error {
  responseCode?: number;
}

const Building = async () => {
  try {
    console.log("inside Login");
    const response = await axios.post(
      "https://hms.3dolphinsocial.com:8083/v1/auth/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("inside Login1 ");

    return response.data;
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || "Login failed"
    );

    customError.responseCode = error.response?.status;
    throw customError;
  }
};

export default Building;
