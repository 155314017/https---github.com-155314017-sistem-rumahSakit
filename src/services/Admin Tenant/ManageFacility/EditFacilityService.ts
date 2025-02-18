import axios from 'axios'
import { BaseResponse } from '../../../types/api.types'
import Cookies from 'js-cookie'
import { EditFacilityRequest, FacilityDataItem } from '../../../types/Facility.types'

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/`

// Function to edit an ambulance service
export const EditFacilityServices = async (
  data: EditFacilityRequest
): Promise<BaseResponse<FacilityDataItem>> => {
  const token = Cookies.get('accessToken')

  if (!token) {
    throw new Error('No access token found.')
  }

  try {
    const response = await axios.put<BaseResponse<FacilityDataItem>>(API_URL, data, {
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
    console.error('Error editing facility:', error)
    throw error
  }
}
