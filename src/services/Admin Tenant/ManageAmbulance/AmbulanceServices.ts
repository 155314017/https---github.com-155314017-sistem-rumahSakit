// src/services/apiService.ts
import axios from "axios";

export interface DataItem {
    id: number;
    title: string;
    body: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ApiResponse {
    responseCode: string;
    statusCode: string;
    message: string;
    data: {
        content: DataItem[];
        pageable: Pageable;
        totalPages: number;
        totalElements: number;
        last: boolean;
        size: number;
        number: number;
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    };
}

const API_URL =
    "https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc";

export const AmbulanceServices = async (): Promise<DataItem[]> => {
    const response = await axios.get<ApiResponse>(API_URL);

    if (response.status === 200) {
        console.log("API connection ambulance successful:", response.data);
        return response.data.data.content;
    } else {
        throw new Error(`API responded with status: ${response.status}`);
    }
};
