export interface BaseResponse<T> {
    responseCode: string;
    statusCode: string;
    message: string;
    data: T;
}

export interface PaginatedResponse<T> {
    responseCode: string;
    statusCode: string;
    message: string;
    data: {
        content: T[];
        pageable: {
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
        };
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