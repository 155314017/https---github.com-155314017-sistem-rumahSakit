import axios from 'axios'
import { PaginatedResponse } from '../../../types/api.types'
import { RoomDataItem } from '../../../types/room.types'

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/`

export const RoomServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<RoomDataItem[]> => {
  try {
    const response = await axios.get<PaginatedResponse<RoomDataItem>>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    })

    if (response.status === 200) {
      
      return response.data.data.content
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
