import axios from 'axios';
import Cookies from "js-cookie";
import { EditRoomRequest, RoomDataItem } from '../../../types/room.types';
import { BaseResponse } from '../../../types/api.types';


const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/`;

export const editRoom = async (
    roomData: EditRoomRequest,
): Promise<BaseResponse<RoomDataItem>> => {
    const token = Cookies.get("accessToken");

    if (!token) {
      throw new Error("No access token found.");
    }

    try {
        const response = await axios.put<BaseResponse<RoomDataItem>>(BASE_URL, roomData, {
            headers: {
                'Content-Type': 'application/json',
                'accessToken': `${token}`,
            },
        });

        // Handle successful response
        if (response.status === 200) {
            return response.data; // Return the response data
        } else {
            throw new Error(`API responded with status: ${response.status}`);
        }
    } catch (error: unknown) {
        // Error handling
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error; // Re-throw the error for the caller to handle
    }
};
