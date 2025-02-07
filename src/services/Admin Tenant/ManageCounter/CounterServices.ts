import axios from 'axios'
export interface CounterDataItem {
  id: string
  masterTypeId: string
  name: string
  location: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  images: string[]
  schedules: { id: string; startDateTime: number; endDateTime: number }[]
  operationalSchedule?: string
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
    content: CounterDataItem[]
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

const API_URL = `${
  import.meta.env.VITE_APP_BACKEND_URL_BASE
}/v1/manage/counter/?`

export const CounterServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<CounterDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    })
    return response.data.data.content
  } catch (error) {
    console.error('Error fetching counter services:', error)
    throw error // Re-throw the error for handling by the caller
  }
}
