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