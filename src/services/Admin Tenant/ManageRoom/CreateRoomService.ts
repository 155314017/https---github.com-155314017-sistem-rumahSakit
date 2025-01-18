import axios from 'axios';
import { BaseResponse } from '../../../types/api';

// Define the interfaces for the request data structure
export interface Schedule {
    startDateTime: string; // ISO 8601 format
    endDateTime: string;   // ISO 8601 format
}

export interface Image {
    imageName: string;
    imageType: string;
    imageData: string; // Base64 encoded image
}

export interface CreateRoomRequest {
    name: string;
    masterBuildingId: string;
    type: string;
    additionalInfo: string;
}

export interface RoomDataItem {
    id: string;
    name: string;
    masterBuildingId: string;
    type: string;
    additionalInfo: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
}

const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/room/`;

// Function to create a room
export const createRoom = async (
    roomData: CreateRoomRequest,
    token: string | undefined
): Promise<BaseResponse<RoomDataItem>> => {
    try {
        // Make the POST request to create the room
        const response = await axios.post<BaseResponse<RoomDataItem>>(BASE_URL, roomData, {
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
