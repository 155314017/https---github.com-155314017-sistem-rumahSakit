
import axios from "axios";


export interface Building {
  no_gedung: string;
  name: string;
  address: string;
}

export const fetchBuildings = async (): Promise<Building[]> => {
  try {
    const response = await axios.get<Building[]>(
      "https://hms.3dolphinsocial.com:8083/v1/manage/building/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc"
    ); 
    return response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw error; 
  }
};
