import axios from 'axios';
import Cookies from 'js-cookie';

// Interface untuk response Ambulance
export interface CounterDataItem {
  id: string;
  name: string;
  location: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
}

export interface ApiResponse{
  responseCode:string;
  responseMessage:string;
  statusCode:string;
  data:CounterDataItem
}

// Layanan untuk mendapatkan data Ambulance
export const GetCounterByIdServices = async (id: string | undefined): Promise<CounterDataItem | null> => {
  try {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('Access token not found');

    const response = await axios.get<ApiResponse>(
        `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching counter data:', error);
    return null;
  }
};
