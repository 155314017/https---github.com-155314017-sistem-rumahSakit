import axios from 'axios'
import Cookies from 'js-cookie'
import { BaseResponse } from '../../../types/api'

export interface Schedule {
  startDateTime: string
  endDateTime: string
}

export interface Image {
  imageName: string
  imageType: string
  imageData: string
}

export interface CreateRoomRequest {
  name: string
  masterBuildingId: string
  type: string
  additionalInfo: string
}

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
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/`
export const createRoom = async (
  roomData: CreateRoomRequest
): Promise<BaseResponse<RoomDataItem>> => {
  try {
    const token = Cookies.get('accessToken')
    const response = await axios.post<BaseResponse<RoomDataItem>>(BASE_URL, roomData, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: `${token}`
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message)
    } else {
      console.error('Unexpected error:', error)
    }
    throw error
  }
}
