import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api.types";
import { BuildingDataItem, EditBuildingRequest } from "../../../types/building.types";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/`;

export const EditBuildingService = async (
  data: EditBuildingRequest
): Promise<BuildingDataItem> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }
  try {
    const response = await axios.put<BaseResponse<BuildingDataItem>>(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        accessToken: token,
      },
    });

    if (response.status === 200) {

      return response.data.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating building:", error);
    throw error; 
  }
};
