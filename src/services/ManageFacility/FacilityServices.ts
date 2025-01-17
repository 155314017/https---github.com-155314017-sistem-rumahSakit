import axios from "axios";
import dayjs from 'dayjs';

export interface FacilityDataItem {
  id: string;
  name: string;
  description: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  masterBuildingId: string;
  cost: number;
  images: string[];
  schedules: { id: string; startDateTime: number; endDateTime: number }[];
  operationalSchedule?: string;
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
    content: FacilityDataItem[];
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
  "https://hms.3dolphinsocial.com:8083/v1/manage/facility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc";

export const FacilityServices = async (): Promise<FacilityDataItem[]> => {
  const response = await axios.get<ApiResponse>(API_URL, {
    timeout: 10000
});

  if (response.status === 200) {
    
    const convertUnixToReadableTime = (timestamp: number) => {
                    const date = dayjs(timestamp); // Use dayjs to parse Unix timestamp
            
                    const dayOfWeek = date.format('dddd'); // Get the day of the week
                    const time = date.format('HH:mm'); // Get the formatted time (HH:mm)
            
                    return { day: dayOfWeek, time };
                  };
    
          response.data.data.content.forEach((item) => {
            if (item.schedules.length > 0) {
              const operationalSchedules: string[] = item.schedules.map((schedule) => {
                const startDate = convertUnixToReadableTime(schedule.startDateTime);
                const endDate = convertUnixToReadableTime(schedule.endDateTime);
    
    
                const startDay = startDate.day;
                const start = `${startDate.time}`;
                const end = ` ${endDate.time}`;
    
                
    
                return `${startDay}, ${start} - ${end}`;
              });

        item.operationalSchedule = operationalSchedules.join(" | "); // Combine all schedules with a separator

      } else {
        console.log("No schedules available.");
      }

      
      
      
    });

    return response.data.data.content;
  } else {
    throw new Error(`API responded with status: ${response.status}`);
  }
};
