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
  images: {imageName: string; imageType: string; imageData: string }[];
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



export const GetRoomByIdServices = async (
  id : string | undefined,
  token : string | undefined
): Promise<RoomDataItem> => {
  try {
    const response = await axios.get<RoomDataItem>(`https://hms.3dolphinsocial.com:8083/v1/manage/room/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        accessToken: `${token}`,
                    }
                })

    if (response.status === 200) {
      console.log('API connection successful:', response.data)

      const item = response.data
        console.log('ID:', item.id)
        console.log('Name Room:', item.name)
        console.log('Name Gedung:', item.masterBuildingId)
        console.log('Jenis Room:', item.type)
        console.log('Additional Info:', item.additionalInfo)
        console.log('Created By:', item.createdBy)
        console.log('Created Date Time:', new Date(item.createdDateTime * 1000).toLocaleString())
        console.log('Updated By:', item.updatedBy)
        console.log(
          'Updated Date Time:',
          item.updatedDateTime ? new Date(item.updatedDateTime * 1000).toLocaleString() : 'N/A'
        )
        console.log('Deleted By:', item.deletedBy)
        console.log(
          'Deleted Date Time:',
          item.deletedDateTime ? new Date(item.deletedDateTime * 1000).toLocaleString() : 'N/A'
        )
        console.log('Images:', item.images)
        console.log('----------------------------')
      

      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
