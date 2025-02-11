import axios from "axios";
import { PaginatedResponse } from "../../../types/api.types";
import { AmbulanceDataItem } from "../../../types/ambulance.types";


const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/ambulance/`;

export const AmbulanceServices = async (
  pageNumber: number = 0,
  pageSize: number = 100, 
  orderBy: string = 'createdDateTime=asc' 
): Promise<PaginatedResponse<AmbulanceDataItem>> => {
  try {
    const response = await axios.get<PaginatedResponse<AmbulanceDataItem>>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    });


    if (response.status === 200) {
      // Return the updated ambulance data items
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching ambulance services:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};