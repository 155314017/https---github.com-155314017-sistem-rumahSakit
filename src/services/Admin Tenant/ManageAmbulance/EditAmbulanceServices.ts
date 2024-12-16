import axios from "axios";
import Cookies from "js-cookie";

export interface AmbulanceDataItem {
  id: string;
  number: string;
  status: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  cost: number;
  images: string[];
  schedules: { id: string; startDateTime: number | undefined; endDateTime: number | undefined }[];
  operationalSchedule?: string;
}

export interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: {
    content: AmbulanceDataItem[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
}

const API_URL = "https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/";

// Function to create an ambulance service
export const EditAmbulanceServices = async (data: {
  number: string;
  status: string;
  cost: number;
  additionalInfo: string;
  images: { imageName: string; imageType: string; imageData: string }[];
  schedules: { startDateTime: number | undefined; endDateTime: number | undefined }[];
}): Promise<AmbulanceDataItem[]> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }

  try {
    const response = await axios.put<ApiResponse>(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: token,
      },
    });

    if (response.status === 200) {
      return response.data.data.content; // Returning the ambulance data content
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error: unknown) {
    // Error handling
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      // Optionally log more details from the error response
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
