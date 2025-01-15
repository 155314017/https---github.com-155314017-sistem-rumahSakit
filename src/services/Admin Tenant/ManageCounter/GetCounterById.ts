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
  images: {imageName: string; imageType: string; imageData: string }[];
  schedules:
    | { id: string; startDateTime: number; endDateTime: number }[]
    | null; // Make sure to handle null
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
  status: number
  message: string
  data: CounterDataItem
}



export const GetCounterByIdServices = async (
    id : string | undefined,
    token : string | undefined
): Promise<CounterDataItem> => {
  try {
    const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/counter/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });

    if (response.status === 200) {

      const item = response.data.data
       

        // Check if schedules is defined and has items
        if (item.schedules && item.schedules.length > 0) {
          const { startDateTime, endDateTime } = item.schedules[0];

          const startDate = new Date(startDateTime * 1000);
          const endDate = new Date(endDateTime * 1000);

          const formatter = new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
          });

          const startDay = formatter.format(startDate);
          const startHours = startDate.getHours().toString().padStart(2, "0");
          const startMinutes = startDate
            .getMinutes()
            .toString()
            .padStart(2, "0");
          const endHours = endDate.getHours().toString().padStart(2, "0");
          const endMinutes = endDate.getMinutes().toString().padStart(2, "0");

          const operationalSchedule = `${startDay}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
          item.operationalSchedule = operationalSchedule; // Store operational schedule in item

        } else {
          item.operationalSchedule = "Jadwal tidak tersedia"; // Optional: Set a default message
        }

        
     

      return response.data.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching counter services:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};
