import axios from "axios";

export interface Schedule {
  startDateTime: string; // ISO 8601 format
  endDateTime: string;   // ISO 8601 format
}

export interface Image {
  imageName: string;
  imageType: string;
  imageData: string; // Base64 encoded image
}

export interface EditCounterRequest {
  name: string;
  location: string;
  queueNumber: number;
  additionalInfo: string;
  masterTypeId: string;
  schedules: { startDateTime: number | undefined; endDateTime: number | undefined }[];
  images: { imageName: string; imageType: string; imageData: string }[];
}

export interface ApiResponse<T> {
  responseCode: string;
  statusCode: string;
  message: string;
  data: T;
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/`;

export const editCounter = async (
  counterData: EditCounterRequest,
  accessToken: string | undefined
): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.put<ApiResponse<null>>(
      BASE_URL,
      counterData,
      {
        headers: {
          accessToken: accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
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
