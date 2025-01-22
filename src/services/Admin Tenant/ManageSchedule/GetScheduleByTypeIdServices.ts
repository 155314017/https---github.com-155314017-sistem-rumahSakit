import axios from 'axios'
import Cookies from "js-cookie";

export interface ScheduleDataItem {
  id: string
  startTime: string
  endTime: string
  typeId: string
  additionalInfo: string
  maxCapacity: number
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  title: string
  description: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
}

export interface ApiResponse {
  status: number
  message: string
  data: ScheduleDataItem[]
}

export const GetScheduleByTypeId = async (
  typeId: string | undefined,
): Promise<ScheduleDataItem[]> => {
  try {
    const token = Cookies.get("accessToken");

    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/schedule-interval/by-type-id?typeId=${typeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'accessToken': `${token}`
        }
      }
    )

    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching schedule data:', error)
    throw error
  }
}
