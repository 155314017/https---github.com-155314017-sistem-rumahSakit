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

export interface CreateClinicRequest {
  name: string;
  description: string;
  additionalInfo: string;
  schedules: { startDateTime: number | undefined; endDateTime: number | undefined }[];
  images: { imageName: string; imageType: string; imageData: string }[];
}

export interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: CreateClinicRequest;
}

const BASE_URL = "https://hms.3dolphinsocial.com:8083/v1/manage/clinic/";

export const createClinic = async (
  clinicData: CreateClinicRequest,
  accessToken: string | undefined
): Promise<ApiResponse> => {
  try {
    console.log(clinicData);
    const response = await axios.post<ApiResponse>(
      BASE_URL,
      clinicData,
      {
        headers: {
          "Content-Type": "application/json",
          'accessToken': `${accessToken}`,
          
        },
      }
    );

    if (response.status === 200) {
      console.log("Clinic created successfully:", response.data);
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
