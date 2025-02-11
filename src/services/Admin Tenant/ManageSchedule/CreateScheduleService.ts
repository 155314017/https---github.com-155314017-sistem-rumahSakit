import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api.types";

export interface ScheduleDataItem {
  id: string;
  startTime: string;
  endTime: string;
  typeId: string;
  additionalInfo: string;
  maxCapacity: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  title: string;
  description: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
}

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/`;

// Function to create a schedule
export const CreateScheduleService = async (data: {
  startTime: string;
  endTime: string;
  typeId: string;
  additionalInfo: string;
  maxCapacity: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  title: string;
  description: string;
}): Promise<BaseResponse<ScheduleDataItem>> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.post<BaseResponse<ScheduleDataItem>>(API_URL, data, {
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
    console.error("Error creating schedule:", error);
    throw error;
  }
};
