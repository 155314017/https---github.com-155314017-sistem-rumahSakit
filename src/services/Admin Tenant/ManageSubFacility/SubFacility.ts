import axios from 'axios'
import { subFacilityDataItem } from '../../../types/subFacility.types'
import { BaseResponse } from '../../../types/api.types'



const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/subfacility/?`

export const SubFacilityServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<subFacilityDataItem> => {
  const response = await axios.get<BaseResponse<subFacilityDataItem>>(API_URL, {
    params: {
      pageNumber,
      pageSize,
      orderBy
    }
  })

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

    return response.data.data
  } else {
    throw new Error(`API responded with status: ${response.status}`)
  }
}
