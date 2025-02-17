import axios from 'axios';
import Cookies from 'js-cookie';

// Interface untuk response Ambulance
export interface AmbulanceData {
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
  images: { imageName: string; imageType: string; imageData: string }[];
  schedules: { id: string; startDateTime: number; endDateTime: number }[];
}

export interface ApiResponse{
  responseCode:string;
  responseMessage:string;
  statusCode:string;
  data:AmbulanceData
}

// Layanan untuk mendapatkan data Ambulance
export const getAmbulanceByIdService = async (id: string | undefined): Promise<AmbulanceData | null> => {
  try {
    const token = Cookies.get('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/ambulance/${id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.data
  } catch (error) {
    console.error('Error fetching ambulance data:', error)
    return null
  }
}
