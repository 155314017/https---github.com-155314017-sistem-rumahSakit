import axios from 'axios'

export interface Schedule {
  startDateTime: string // ISO 8601 format
  endDateTime: string // ISO 8601 format
}

export interface Image {
  imageName: string
  imageType: string
  imageData: string // Base64 encoded image
}

export interface CreateClinicRequest {
  name: string
  description: string
  additionalInfo: string
  schedules: { startDateTime: number | undefined; endDateTime: number | undefined }[]
  images: { imageName: string; imageType: string; imageData: string }[]
}

export interface ApiResponse {
  responseCode: string
  statusCode: string
  message: string
  data: CreateClinicRequest
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/`

export const createClinic = async (
  clinicData: CreateClinicRequest,
  accessToken: string | undefined
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(BASE_URL, clinicData, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: `${accessToken}`
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
    throw error // Re-throw the error for caller
  }
}
