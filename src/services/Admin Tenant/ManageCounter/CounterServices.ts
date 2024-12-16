import axios from "axios";

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
  schedules:
    | { id: string; startDateTime: number; endDateTime: number }[]
    | null;
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

const API_URL =
  "https://hms.3dolphinsocial.com:8083/v1/manage/counter/?pageNumber=0&pageSize=10&orderBy=id=desc";

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
      const counterData = content.map((item) => {
        if (item.schedules && item.schedules.length > 0) {
          const operationalSchedules: string[] = item.schedules.map((schedule) => {
            const startDate = new Date(schedule.startDateTime * 1000);
            const endDate = new Date(schedule.endDateTime * 1000);

            const formatter = new Intl.DateTimeFormat("id-ID", {
              weekday: "long",
            });

            const startDay = formatter.format(startDate);
            const startHours = startDate.getHours().toString().padStart(2, "0");
            const startMinutes = startDate.getMinutes().toString().padStart(2, "0");
            const endHours = endDate.getHours().toString().padStart(2, "0");
            const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

            return `${startDay}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
          });

          item.operationalSchedule = operationalSchedules.join(" | ");
        } else {
          item.operationalSchedule = "No schedules available.";
        }

        return item;
      });

      return counterData;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching counter services:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};
