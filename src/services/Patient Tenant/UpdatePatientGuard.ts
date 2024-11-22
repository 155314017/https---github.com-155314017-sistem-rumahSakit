import axios from "axios";
import Cookies from "js-cookie";

interface CustomError extends Error {
  responseCode?: number;
}

interface Data {
  patientId: string;
  guardianIdentityNumber: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianGender: string;
  guardianAddress: string;
}
const UpdatePatientGuards = async (data: Data) => {
  try {
    console.log("inside RegisterPatient");
    const response = await axios.put(
      "https://hms.3dolphinsocial.com:8083/v1/patient/register",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("inside Login1 ");
    console.log("Response register: ", response);
    return response.data;
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || "Login failed"
    );

    customError.responseCode = error.response?.status;
    throw customError;
  }
};

export default UpdatePatientGuards;
