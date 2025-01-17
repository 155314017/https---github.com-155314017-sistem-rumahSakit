import axios from "axios";
import dayjs from "dayjs";
export interface CounterDataItem {
  id: string;
  masterTypeId: string;
  name: string;
  location: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
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
    content: CounterDataItem[];
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

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/?pageNumber=0&pageSize=10&orderBy=id=desc`;

export const CounterServices = async (): Promise<CounterDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);

    if (response.status === 200) {
      const content = response.data.data.content;
      if (!content || content.length === 0) {
        console.warn("No counter data found in response.");
        return [];
      }

      // Process each item in the content array
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
                item.operationalSchedule = operationalSchedules.join(" | ");
              } else {
                item.operationalSchedule = "No schedules available.";
              }
            });
            return response.data.data.content;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching counter services:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};
