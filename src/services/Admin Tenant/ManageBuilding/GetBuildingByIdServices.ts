import axios from 'axios'
import Cookies from 'js-cookie';
import { BuildingDataItem } from '../../../types/building.types';
import { BaseResponse } from '../../../types/api.types';

export const GetBuildingById = async (
  id : string | undefined,
): Promise<BuildingDataItem> => {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("No access token found.");
  }
  try {
    const response = await axios.get<BaseResponse<BuildingDataItem>>(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'accessToken': `${token}`
        }
    })

    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
