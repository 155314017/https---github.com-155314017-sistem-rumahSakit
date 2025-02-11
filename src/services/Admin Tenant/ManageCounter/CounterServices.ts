import axios from 'axios'
import { CounterDataItem } from '../../../types/counter.types'
import { PaginatedResponse } from '../../../types/api.types'

const API_URL = `${
  import.meta.env.VITE_APP_BACKEND_URL_BASE
}/v1/manage/counter/?`

export const CounterServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<PaginatedResponse<CounterDataItem>> => {
  try {
    const response = await axios.get<PaginatedResponse<CounterDataItem>>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    })
    if(response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
    
  } catch (error) {
    console.error('Error fetching counter services:', error)
    throw error // Re-throw the error for handling by the caller
  }
}
