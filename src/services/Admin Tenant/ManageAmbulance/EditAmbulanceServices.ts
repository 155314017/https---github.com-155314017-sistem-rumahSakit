import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api.types";
import { AmbulanceDataItem } from "../../../types/ambulance.types";



const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/ambulance/`;

// Function to edit an ambulance service
export const EditAmbulanceServices = async (
  data: {
    ambulanceId: string,
    number: string,
    status: string,
    additionalInfo: string,
    cost: number
  }): Promise<BaseResponse<AmbulanceDataItem>> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.put<BaseResponse<AmbulanceDataItem>>(API_URL, data,
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
    console.error('Error editing ambulance:', error);
    throw error;
  }
};
