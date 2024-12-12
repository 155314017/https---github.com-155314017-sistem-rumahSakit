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

export interface FacilityRequest {
    name: string;
    facilityDataId: string;
    description: string;
    cost: number;
    additionalInfo: string;
    schedules: { startDateTime: number; endDateTime: number }[];
    images: { imageName: string; imageType: string; imageData: string }[];
}

export interface ApiResponse {
    responseCode: string;
    statusCode: string;
    message: string;
    data: FacilityRequest;
}


// Function to create a facility
export const GetSubFacilityById = async (
    id: string | undefined,
    token: string | undefined
): Promise<FacilityRequest> => {
    
    
     // Assuming 'accessToken' is stored in cookies

    try {
        // Make the POST request to create the facility
        const response = await axios.get<ApiResponse>(`https://hms.3dolphinsocial.com:8083/v1/manage/subfacility/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'accessToken': `${token}`
            }
        });

        // Handle successful response
        if (response.status === 200) {
            console.log("Facility created successfully:", response.data);
            return response.data.data; // Return the response data
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