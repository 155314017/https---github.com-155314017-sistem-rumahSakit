import axios from "axios";

export interface ClinicData {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  // Tambahkan properti lain sesuai respons API
}

export interface ApiResponse<T> {
  responseCode: string;
  statusCode: string;
  message: string;
  data: T;
}

const BASE_URL = "http://localhost:8080/v1/manage/clinic";

export const getClinic = async (
  clinicId: string,
  accessToken: string
): Promise<ClinicData> => {
  try {
    const response = await axios.get<ApiResponse<ClinicData>>(
      `${BASE_URL}/${clinicId}`,
      {
        headers: {
          accessToken: accessToken,
        },
      }
    );

    if (response.status === 200) {
      console.log("Clinic data fetched successfully:", response.data.data);
      return response.data.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw the error for caller
  }
};
