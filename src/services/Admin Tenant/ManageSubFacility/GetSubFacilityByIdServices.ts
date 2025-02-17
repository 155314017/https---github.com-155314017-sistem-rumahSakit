import axios from 'axios'
import Cookies from 'js-cookie'
import { BaseResponse } from '../../../types/api.types'
import { FacilityRequest } from '../../../types/Facility.types'

// Define the interfaces for the request data structure




// Function to create a facility
export const GetSubFacilityById = async (id: string | undefined): Promise<FacilityRequest> => {
  // Assuming 'accessToken' is stored in cookies

  try {
    const token = Cookies.get('accessToken')
    // Make the POST request to create the facility
    const response = await axios.get<BaseResponse<FacilityRequest>>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      }
    )

    // Handle successful response
    if (response.status === 200) {
      return response.data.data // Return the response data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error: unknown) {
    // Error handling
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message)
    } else {
      console.error('Unexpected error:', error)
    }
    throw error // Re-throw the error for the caller to handle
  }
}
