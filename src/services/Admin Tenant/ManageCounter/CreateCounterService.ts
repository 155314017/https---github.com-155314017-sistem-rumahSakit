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

export interface CreateCounterRequest {
  name: string;
  location: string;
  queueNumber: number;
  additionalInfo: string;
  masterTypeId: string;
  schedules: { startDateTime: number | undefined; endDateTime: number | undefined }[];
  images: { imageName: string; imageType: string; imageData: string }[];
}

export interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: CreateCounterRequest;
}

const BASE_URL = "https://hms.3dolphinsocial.com:8083/v1/manage/counter/";

export const createCounter = async (
  counterData: CreateCounterRequest,
  accessToken: string | undefined
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
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
