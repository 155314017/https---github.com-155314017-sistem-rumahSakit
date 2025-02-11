import axios from "axios";
import Cookies from "js-cookie";
import { BaseResponse } from "../../../types/api.types";
import { ScheduleDataItem } from "./CreateScheduleService";

interface EditScheduleRequest {
  scheduleIntervalId: string;
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
}

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/`;

/**
 * Service untuk mengedit jadwal yang sudah ada
 * @param data - Data jadwal yang akan diperbarui
 * @returns Promise dengan response dari API
 */
export const EditScheduleService = async (
  data: EditScheduleRequest
): Promise<BaseResponse<ScheduleDataItem>> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("Token akses tidak ditemukan.");
  }

  try {
    const response = await axios.put<BaseResponse<ScheduleDataItem>>(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        accessToken: token,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`API merespons dengan status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error saat mengedit jadwal:", error);
    throw error;
  }
}; 