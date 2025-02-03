import axios from 'axios'
import Cookies from "js-cookie";

export interface ExclusionDataItem {
  id: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: string;
  updatedBy: string | null;
  updatedDateTime: string | null;
  deletedBy: string | null;
  deletedDateTime: string | null;
  typeId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}

export interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: ExclusionDataItem[];
}

export const GetExclusionByTypeId = async (
  typeId: string | undefined,
): Promise<ExclusionDataItem[]> => {
  try {

    const token = Cookies.get("accessToken");

    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/exclusion-interval/by-type-id?typeId=${typeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': `${token}`
        }
      }
    )

    if (response.status === 200) {
      console.log("here exclusion: ")
      console.log(response.data.data)
      return response.data.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }

  } catch (error) {
    console.error('Error fetching schedule data:', error)
    throw error
  }
}
