import axios from 'axios'
import Cookies from 'js-cookie'
import { BaseResponse } from '../../../types/api.types'
import { EditSubfacilityRequest, subFacilityDataItem } from '../../../types/subFacility.types'




const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility/`

// Function to create a facility
export const editSubfacility = async (
  subfacilityData: EditSubfacilityRequest
): Promise<BaseResponse<subFacilityDataItem>> => {
  // Assuming 'accessToken' is stored in cookies

  try {
    const token = Cookies.get('accessToken')
    // Make the POST request to create the facility
    const response = await axios.put<BaseResponse<subFacilityDataItem>>(BASE_URL, subfacilityData, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    })

    // Handle successful response
    if (response.status === 200) {
      return response.data // Return the response data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error: unknown) {
    // Error handling
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data
      console.error('[DEBUG] Error from server:', responseData || error.message)
    } else {
      console.error('[DEBUG] Unexpected error:', error)
    }

    throw error // Re-throw the error for the caller to handle
  }
}
