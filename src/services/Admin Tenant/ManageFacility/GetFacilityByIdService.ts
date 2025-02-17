import axios from 'axios'
import Cookies from 'js-cookie'
import { FacilityDataItem } from '../../../types/Facility.types'
import { BaseResponse } from '../../../types/api.types'

// Interface untuk response Ambulance


// Layanan untuk mendapatkan data Ambulance
export const getFacilityByIdService = async (
  id: string | undefined
): Promise<FacilityDataItem | null> => {
  try {
    const token = Cookies.get('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get<BaseResponse<FacilityDataItem>>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/${id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.data
  } catch (error) {
    console.error('Error fetching facility data:', error)
    return null
  }
}
