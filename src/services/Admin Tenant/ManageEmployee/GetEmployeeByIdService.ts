import axios from 'axios'

interface MenuPrivilege {
  id: string
  masterMenuId: string
  masterUserId: string
  canCreate: boolean
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
  createdDateTime: number
  updatedDateTime: number | null
  deletedDateTime: number | null
  updatedBy: string | null
  deletedBy: string | null
  createdBy: string
  additionalInfo: string | null
}

interface MasterUser {
  id: string
  masterGroupId: string | null
  masterDashboardId: string | null
  identityNumber: string
  email: string
  firstName: string
  lastName: string
  nickname: string | null
  phone: string
  maritalStatus: string | null
  gender: string | null
  profileImage: string | null
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  additionalInfo: string | null
  statusActive: string | null
  menuPrivileges: MenuPrivilege[]
}

interface EmployeeData {
  id: string
  masterUserId: string
  name: string
  gender: string
  address: string
  phone: string
  additionalInfo: string | null
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: string | null
  employeeNumber: string
  birthDate: number[]
  role: string
  masterUser: MasterUser
}

interface ApiResponse {
  responseCode: string
  statusCode: string
  message: string
  data: EmployeeData
}

export const GetEmployeeByIdServices = async (id: string | undefined): Promise<EmployeeData> => {
  try {
    const response = await axios.get<ApiResponse>(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/employee/${id}`
    )

    if (response.status === 200) {
      return response.data.data 
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching doctor services:', error)
    throw error
  }
}
