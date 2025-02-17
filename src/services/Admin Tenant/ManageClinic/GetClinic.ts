import axios from 'axios'
import { BaseResponse } from '../../../types/api.types'
import { ClinicDataItem } from '../../../types/clinic.types'





const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic`

export const getClinic = async (clinicId: string | undefined): Promise<ClinicDataItem> => {
  // const token = Cookies.get('accessToken')
  try {
    const response = await axios.get<BaseResponse<ClinicDataItem>>(`${BASE_URL}/${clinicId}`, {
      headers: {
        // accessToken: token
      }
    })

    if (response.status === 200) {
      return response.data.data
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
