import axios from 'axios'
import Cookies from 'js-cookie'
import { AmbulanceDataItem } from '../../../types/ambulance.types'
import { BaseResponse } from '../../../types/api.types'

export const getAmbulanceByIdService = async (
  id: string | undefined
): Promise<AmbulanceDataItem | null> => {
  try {
    const token = Cookies.get('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get<BaseResponse<AmbulanceDataItem>>(
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
