import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api.types";

export interface ExclusionScheduleDataItem {
  exclusionIntervalId: string;
  additionalInfo: string;
  typeId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/exclusion-interval/`;

// Function to create an exclusion schedule
export const CreateExclusionScheduleService = async (data: {
  additionalInfo: string;
  typeId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}): Promise<BaseResponse<ExclusionScheduleDataItem>> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.post<BaseResponse<ExclusionScheduleDataItem>>(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        accessToken: token,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating exclusion schedule:", error);
    throw error;
  }
};
