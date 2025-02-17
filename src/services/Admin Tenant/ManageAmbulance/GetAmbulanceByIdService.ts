import axios from 'axios';
import Cookies from 'js-cookie';
import { BaseResponse } from '../../../types/api.types';
import { AmbulanceData } from '../../../types/ambulance.types';

// Interface untuk response Ambulance




// Layanan untuk mendapatkan data Ambulance
export const getAmbulanceByIdService = async (id: string | undefined): Promise<AmbulanceData | null> => {
  try {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('Access token not found');

    const response = await axios.get<BaseResponse<AmbulanceData>>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/ambulance/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching ambulance data:', error);
    return null;
  }
};
