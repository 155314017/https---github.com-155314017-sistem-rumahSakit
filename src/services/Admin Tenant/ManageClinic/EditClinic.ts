import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api";
import { ClinicData } from "./GetClinicByIdService";
const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/`;

// Function to edit an clinic service
export const EditClinicServices = async (
  data: {
    clinicId: string,
    name: string,
    description: string,
    additionalInfo: string,
    code: string
  }): Promise<BaseResponse<ClinicData>> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.put<BaseResponse<ClinicData>>(API_URL, data,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: token,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error editing clinic:', error);
    throw error;
  }
};
