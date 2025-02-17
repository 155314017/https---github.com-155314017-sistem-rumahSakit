import axios from 'axios';
import Cookies from 'js-cookie';
import { BaseResponse } from '../../../types/api.types';
import { ClinicDataItem } from '../../../types/clinic.types';

// Interface untuk response Ambulance




// Layanan untuk mendapatkan data Ambulance
export const getClinicByIdService = async (id: string | undefined): Promise<ClinicDataItem | null> => {
  try {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('Access token not found');

    const response = await axios.get<BaseResponse<ClinicDataItem>>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/${id}`,
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
