import axios from 'axios'
import Cookies from 'js-cookie'
import { BaseResponse } from '../../../types/api.types'
import { subFacilityDataItem } from '../../../types/subFacility.types'





const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility/`

export const createSubFacilityServices = async (data: {
  name: string
  facilityDataId: string
}): Promise<BaseResponse<subFacilityDataItem>> => {
  const token = Cookies.get('accessToken')

  if (!token) {
    throw new Error('No access token found.')
  }

  try {
    const response = await axios.post<BaseResponse<subFacilityDataItem>>(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: token
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error creating clinic:', error)
    throw error
  }
}
