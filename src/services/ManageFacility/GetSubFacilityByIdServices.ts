import axios from 'axios'
import Cookies from 'js-cookie'
import { ScheduleData } from '../Admin Tenant/ManageSchedule/GetScheduleById'

// Interface untuk response Ambulance
export interface SubFacilityData {
  id: string
  name: string
  description: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  facilityDataId: string
  cost: number
  schedules: ScheduleData[]
}

export interface ApiResponse {
  responseCode: string
  responseMessage: string
  statusCode: string
  data: SubFacilityData
}

// Layanan untuk mendapatkan data Ambulance
export const GetSubFacilityByIdService = async (
  id: string | undefined
): Promise<SubFacilityData | null> => {
  try {
    const token = Cookies.get('accessToken')
    if (!token) throw new Error('Access token not found')

    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility/${id}`,
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
