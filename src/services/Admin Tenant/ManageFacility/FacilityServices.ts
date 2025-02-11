import axios from 'axios'
import { PaginatedResponse } from '../../../types/api.types'
// import dayjs from 'dayjs'

export interface FacilityDataItem {
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
  masterBuildingId: string
  cost: number
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
    content: FacilityDataItem[]
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
