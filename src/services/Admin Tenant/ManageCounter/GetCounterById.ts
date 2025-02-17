import axios from 'axios';
import Cookies from 'js-cookie';
import { BaseResponse } from '../../../types/api.types';
import { CounterDataItem } from '../../../types/counter.types';

// Interface untuk response Ambulance


// Layanan untuk mendapatkan data Ambulance
export const GetCounterByIdServices = async (id: string | undefined): Promise<CounterDataItem | null> => {
  try {
    const token = Cookies.get('accessToken');
    if (!token) throw new Error('Access token not found');

    const response = await axios.get<BaseResponse<CounterDataItem>>(
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
