import axios from 'axios';

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
    images: { imageName: string; imageType: string; imageData: string }[];
}

export interface ApiResponse<T> {
    responseCode: string;
    statusCode: string;
    message: string;
    data: T;
}

const BASE_URL = "https://hms.3dolphinsocial.com:8083/v1/manage/room/";

// Function to create a facility
export const createRoom = async (
    roomData: CreateRoomRequest,
    token: string | undefined
): Promise<ApiResponse<null>> => {
    
    
     // Assuming 'accessToken' is stored in cookies

    try {
        // Make the POST request to create the facility
        const response = await axios.post<ApiResponse<null>>(BASE_URL, roomData, {
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
