import axios from 'axios'

export interface RoomDataItem {
  id: string
  name: string
  masterBuildingId: string
  type: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  images: string[]
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ApiResponse {
  responseCode: string
  statusCode: string
  message: string
  data: {
    content: RoomDataItem[]
    pageable: Pageable
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: {
      sorted: boolean
      empty: boolean
      unsorted: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean
  }
}

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/`

export const RoomServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<RoomDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
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
