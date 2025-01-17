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
  images: { imageName: string; imageType: string; imageData: string }[]
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
  status: number
  message: string
  data: RoomDataItem
}

export const GetRoomByIdServices = async (
  id: string | undefined,
  token: string | undefined
): Promise<RoomDataItem> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          accessToken: `${token}`
        }
      }
    )

    if (response.status === 200) {

      return response.data.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
