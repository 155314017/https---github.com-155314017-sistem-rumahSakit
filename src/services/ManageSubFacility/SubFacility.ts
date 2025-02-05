import axios from 'axios'

export interface SubFacilityDataItem {
  id: string
  name: string
  additionalInfo: string
  facilityDataId: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  masterBuildingId: string
  cost: number
  images: string[]
  schedules: { id: string; startDateTime: number; endDateTime: number }[]
  operationalSchedule?: string
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ApiResponse {
  responseCode: string
  statusCode: string
  message: string
  data: {
    content: SubFacilityDataItem[]
    pageable: Pageable
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: {
      sorted: boolean
      empty: boolean
      unsorted: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean
  }
}

const API_URL = `${
  import.meta.env.VITE_APP_BACKEND_URL_BASE
}/v1/manage/subfacility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc`

export const SubFacilityServices = async (): Promise<SubFacilityDataItem[]> => {
  const response = await axios.get<ApiResponse>(API_URL)

  if (response.status === 200) {
    // response.data.data.content.forEach((item) => {
    //   if (item.schedules.length > 0) {
    //     const operationalSchedules: string[] = item.schedules.map(
    //       (schedule) => {
    //         const startDate = new Date(schedule.startDateTime * 1000);
    //         const endDate = new Date(schedule.endDateTime * 1000);

    //         const formatter = new Intl.DateTimeFormat("id-ID", {
    //           weekday: "long",
    //         });

    //         const startDay = formatter.format(startDate);
    //         const startHours = startDate
    //           .getHours()
    //           .toString()
    //           .padStart(2, "0");
    //         const startMinutes = startDate
    //           .getMinutes()
    //           .toString()
    //           .padStart(2, "0");
    //         const endHours = endDate.getHours().toString().padStart(2, "0");
    //         const endMinutes = endDate
    //           .getMinutes()
    //           .toString()
    //           .padStart(2, "0");

    //         return `${startDay}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
    //       }
    //     );

    //     item.operationalSchedule = operationalSchedules.join(" | "); // Combine all schedules with a separator

    //   }

    // });

    return response.data.data.content
  } else {
    throw new Error(`API responded with status: ${response.status}`)
  }
}
