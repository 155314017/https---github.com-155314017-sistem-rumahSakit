import axios from "axios";

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

const API_URL =
  "https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc";

export const AmbulanceServices = async (): Promise<AmbulanceDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);

    if (response.status === 200) {
      console.log("API connection successful:", response.data);

      response.data.data.content.forEach((item) => {
        console.log("ID:", item.id);
        console.log("Number:", item.number);
        console.log("Status:", item.status);

        // Mendapatkan jam operasional
        if (item.schedules.length > 0) {
          const { startDateTime, endDateTime } = item.schedules[0];

          const startDate = new Date(startDateTime * 1000);
          const endDate = new Date(endDateTime * 1000);

          const startHours = startDate.getHours();
          const startMinutes = startDate.getMinutes();
          const endHours = endDate.getHours();
          const endMinutes = endDate.getMinutes();

          // Membuat string jam operasional
          const operationalSchedule = `${startHours}:${
            startMinutes < 10 ? "0" : ""
          }${startMinutes} - ${endHours}:${
            endMinutes < 10 ? "0" : ""
          }${endMinutes}`;
          item.operationalSchedule = operationalSchedule; // Menyimpan jam operasional ke item

          console.log("Operational Schedule:", operationalSchedule);
        } else {
          console.log("No schedules available.");
        }

        console.log("Additional Info:", item.additionalInfo);
        console.log("Created By:", item.createdBy);
        console.log(
          "Created Date Time:",
          new Date(item.createdDateTime * 1000).toLocaleString()
        );
        console.log("Updated By:", item.updatedBy);
        console.log(
          "Updated Date Time:",
          item.updatedDateTime
            ? new Date(item.updatedDateTime * 1000).toLocaleString()
            : "N/A"
        );
        console.log("Deleted By:", item.deletedBy);
        console.log(
          "Deleted Date Time:",
          item.deletedDateTime
            ? new Date(item.deletedDateTime * 1000).toLocaleString()
            : "N/A"
        );
        console.log("Images:", item.images);
        console.log("----------------------------");
      });

      return response.data.data.content;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching ambulance services:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};


