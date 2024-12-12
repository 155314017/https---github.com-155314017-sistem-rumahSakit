import axios from "axios";

export interface ClinicDataItem {
  id: string;
  name: string;
  description: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  images: string[];
  schedules: { id: string; startDateTime: number; endDateTime: number }[];
  operationalSchedule?: string;
}

export interface ApiResponse<T> {
  responseCode: string;
  statusCode: string;
  message: string;
  data: T;
}

const BASE_URL = "http://localhost:8080/v1/manage/clinic";

export const getClinic = async (
  clinicId: string | undefined,
  accessToken: string | undefined
): Promise<ClinicDataItem> => {
  try {
    const response = await axios.get<ApiResponse<ClinicDataItem>>(
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
