import axios from 'axios'
import { subFacilityDataItem } from '../../../types/subFacility.types'
import { PaginatedResponse } from '../../../types/api.types'

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility/`

export const SubFacilityServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<PaginatedResponse<subFacilityDataItem>> => {
  const response = await axios.get<PaginatedResponse<subFacilityDataItem>>(API_URL, {
    params: {
      pageNumber,
      pageSize,
      orderBy
    }
  })

  if (response.status === 200) {
    return response.data
  } else {
    throw new Error(`API responded with status: ${response.status}`)
  }
}
