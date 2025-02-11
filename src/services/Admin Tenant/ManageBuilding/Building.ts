import axios from 'axios'
import { PaginatedResponse } from '../../../types/api.types'
import { BuildingDataItem } from '../../../types/building.types'

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/`

export const Building = async (
  pageNumber: number = 0,
  pageSize: number = 100, 
  orderBy: string = 'createdDateTime=asc' 
): Promise<PaginatedResponse<BuildingDataItem>> => {
  try {
    const response = await axios.get<PaginatedResponse<BuildingDataItem>>(API_URL, {
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
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
