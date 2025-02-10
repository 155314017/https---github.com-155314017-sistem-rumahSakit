import { ScheduleData } from "../services/Admin Tenant/ManageSchedule/GetScheduleById";

export interface AmbulanceDataItem {
    id: string;
    number: string;
    status: string;
    additionalInfo: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
    cost: number;
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
      content: AmbulanceDataItem[];
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