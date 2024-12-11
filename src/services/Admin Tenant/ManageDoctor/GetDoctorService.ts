import axios from "axios";

export interface DoctorDataItem {
  id: string;
  name: string;
  specialty: string;
  additionalInfo: string;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: number | null;
  deletedBy: string | null;
  deletedDateTime: number | null;
  images: string[];
  schedules: null;
  cost: number | null;
  parentClinicId: string;
  employeeData: string | null;
}





export const GetDoctorServices = async (id : string | undefined): Promise<DoctorDataItem> => {
  try {
    const response = await axios.get<DoctorDataItem>(`https://hms.3dolphinsocial.com:8083/v1/manage/clinic/${id}`);

    if (response.status === 200) {
      console.log("API connection successful:", response.data);

      

      return response.data;
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching ambulance services:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};
