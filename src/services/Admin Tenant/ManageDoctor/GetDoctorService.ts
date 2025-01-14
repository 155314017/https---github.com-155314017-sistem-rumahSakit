import axios from 'axios'

interface Schedule {
  id: string;
  startDateTime: number;
  endDateTime: number;
  typeId: string;
  additionalInfo: string | null;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: string | null;
  deletedBy: string | null;
  deletedDateTime: string | null;
}

interface MasterUser {
  id: string;
  masterGroupId: string | null;
  masterDashboardId: string | null;
  identityNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string | null;
  phone: string;
  maritalStatus: string | null;
  gender: string | null;
  profileImage: string | null;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string | null;
  updatedDateTime: string | null;
  deletedBy: string | null;
  deletedDateTime: string | null;
}

interface EmployeeData {
  id: string;
  masterUserId: string;
  name: string;
  gender: string;
  address: string;
  phone: string;
  additionalInfo: string | null;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string;
  updatedDateTime: number;
  deletedBy: string | null;
  deletedDateTime: string | null;
  employeeNumber: string;
  birthDate: number[];
  role: string;
  masterUser: MasterUser;
}

interface DoctorDataItem {
  id: string;
  name: string;
  specialty: string;
  additionalInfo: string | null;
  createdBy: string;
  createdDateTime: number;
  updatedBy: string;
  updatedDateTime: number;
  deletedBy: string | null;
  deletedDateTime: string | null;
  schedules: Schedule[];
  cost: number;
  parentClinicId: string;
  employeeData: EmployeeData;
}

interface ApiResponse {
  responseCode: string;
  statusCode: string;
  message: string;
  data: DoctorDataItem;
}

export const GetDoctorServices = async (id: string | undefined): Promise<DoctorDataItem> => {
  try {
    const response = await axios.get<{ data:ApiResponse }>(
      `https://hms.3dolphinsocial.com:8083/v1/manage/doctor/${id}`
    )

    if (response.status === 200) {
      console.log('API connection successful:', response.data.data)

      return response.data.data // Pastikan mengakses `data` dari respons
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching doctor services:', error)
    throw error
  }
}
