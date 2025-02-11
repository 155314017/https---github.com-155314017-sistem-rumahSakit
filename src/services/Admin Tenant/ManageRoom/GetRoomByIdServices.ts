import axios from 'axios'
import Cookies from 'js-cookie'
import { RoomDataItem } from '../../../types/room.types'
import { BaseResponse } from '../../../types/api.types'

export const GetRoomByIdServices = async (id: string | undefined): Promise<RoomDataItem> => {
  try {
    const token = Cookies.get("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }
    const response = await axios.get<BaseResponse<RoomDataItem>>(
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
