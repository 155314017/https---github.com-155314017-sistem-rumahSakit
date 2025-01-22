import axios from 'axios'

export interface CreateFacilityRequest {
  name: string
  masterBuildingId: string
  description: string
  cost: number
  additionalInfo: string
}

export interface ApiResponse<T> {
  responseCode: string
  statusCode: string
  message: string
  data: T
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/`

export const createFacility = async (
  facilityData: CreateFacilityRequest,
  token: string | undefined
): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.post<ApiResponse<null>>(BASE_URL, facilityData, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message)
    } else {
      console.error('Unexpected error:', error)
    }
    throw error
  }
}
