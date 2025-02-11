import axios from 'axios'
import { PaginatedResponse } from '../../../types/api.types'
import { ClinicDataItem } from '../../../types/clinic.types'


const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/`

export const Clinic = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<PaginatedResponse<ClinicDataItem>> => {
  try {
    const response = await axios.get<PaginatedResponse<ClinicDataItem>>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    })

    if (response.data.responseCode === '200') {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching ambulance services:', error)
    throw error 
  }
}
