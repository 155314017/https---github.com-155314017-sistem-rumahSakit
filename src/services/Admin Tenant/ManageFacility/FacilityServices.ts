import axios from 'axios'
import { PaginatedResponse } from '../../../types/api.types'
import { FacilityDataItem } from '../../../types/Facility.types'
// import dayjs from 'dayjs'



const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/?`

export const FacilityServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<PaginatedResponse<FacilityDataItem>> => {
  const response = await axios.get<PaginatedResponse<FacilityDataItem>>(API_URL, {
    params: {
      pageNumber,
      pageSize,
      orderBy
    },
    timeout: 10000
  })

  if (response.status === 200) {
    return response.data
  } else {
    throw new Error(`API responded with status: ${response.status}`)
  }
}
