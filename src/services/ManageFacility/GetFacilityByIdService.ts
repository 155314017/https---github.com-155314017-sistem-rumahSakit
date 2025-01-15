import axios from "axios";
import dayjs from "dayjs";

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
  images: {imageName: string; imageType: string; imageData: string }[];
  schedules: { id: string; startDateTime: number; endDateTime: number }[];
  operationalSchedules?: string;
}

export interface ApiResponse {
  status: number;
  message: string;
  data: FacilityDataItem;
}





export const GetFacilityByIdServices = async (id : string | undefined, accessToken: string | undefined): Promise<FacilityDataItem> => {
  const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/${id}`, {
    headers: {
        'Content-Type': 'application/json',
        'accessToken': `${accessToken}`
    }});

  if (response.status === 200) {
    const convertUnixToReadableTime = (timestamp: number) => {
                        const date = dayjs(timestamp); // Use dayjs to parse Unix timestamp
                
                        const dayOfWeek = date.format('dddd'); // Get the day of the week
                        const time = date.format('HH:mm'); // Get the formatted time (HH:mm)
                
                        return { day: dayOfWeek, time };
                      };
    
    const item = response.data.data; 
      

      if (item.schedules.length > 0) {
        const operationalSchedules: string[] = item.schedules.map((schedule) => {
          const startDate = convertUnixToReadableTime(schedule.startDateTime);
          const endDate = convertUnixToReadableTime(schedule.endDateTime);


          const startDay = startDate.day;
          const start = `${startDate.time}`;
          const end = ` ${endDate.time}`;

          

          return `${startDay}, ${start} - ${end}`;
        });
        item.operationalSchedules = operationalSchedules.join(" | ");

      } 

    
 

    return response.data.data;
  } else {
    throw new Error(`API responded with status: ${response.status}`);
  }
};
