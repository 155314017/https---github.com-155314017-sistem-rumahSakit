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
  images: string[];
  schedules: { id: string; startDateTime: number; endDateTime: number }[];
}

// Layanan untuk mendapatkan data Ambulance
export const getAmbulanceByIdService = async (id: string): Promise<AmbulanceData | null> => {
  try {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('Access token not found');

    const response = await axios.get<AmbulanceData>(
      `https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching ambulance data:', error);
    return null;
  }
};
