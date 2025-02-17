
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


  export interface AmbulanceData {
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
    images: { imageName: string; imageType: string; imageData: string }[];
    schedules: { id: string; startDateTime: number; endDateTime: number }[];
  }
  
