import axios from 'axios'

export interface ClinicDataItem {
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
  images: string[]
  schedules: { id: string; startDateTime: number; endDateTime: number }[]
  operationalSchedule?: string
  code: string
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
    content: ClinicDataItem[]
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

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/`

export const Clinic = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<ClinicDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    })

    if (response.data.responseCode === '200') {
      return response.data.data.content
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching ambulance services:', error)
    throw error 
  }
}
