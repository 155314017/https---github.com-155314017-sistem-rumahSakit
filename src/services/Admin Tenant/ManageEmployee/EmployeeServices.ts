import axios from 'axios'

export interface EmployeeDataItem {
  id: string
  masterUserId: string
  name: string
  gender: string
  address: string
  phone: string
  additionalInfo: string | null
  createdBy: string
  createdDateTime: number | null
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  employeeNumber: string
  birthDate: number[]
  role: string
  masterUser: {
    id: string
    masterGroupId: string
    masterDashboardId: string
    identityNumber: string
    email: string
    firstName: string
    lastName: string
    nickname: string
    phone: string
    maritalStatus: string
    updatedDateTime: number | null
    createdDateTime: number | null
    deletedDateTime: number | null
    statusActive: string
    additionalInfo: string | null
    updatedBy: string
    createdBy: string
    deletedBy: string
    menuPrivileges: {
      id: string
      masterMenuId: string
      masterUserId: string
      canCreate: boolean
      canRead: boolean
      canUpdate: boolean
      canDelete: boolean
      createdDateTime: number | null
      updatedDateTime: number | null
      deletedDateTime: number | null
      updatedBy: string | null
      deletedBy: string | null
      createdBy: string
      additionalInfo: string | null
    }[]
  }
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
    content: EmployeeDataItem[]
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

const API_URL = 'https://hms.3dolphinsocial.com:8083/v1/manage/employee/'

export const EmployeeServices = async (
  pageNumber = 0,
  pageSize = 10
): Promise<EmployeeDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL, {
      params: {
        pageNumber,
        pageSize,
        orderBy: 'createdDateTime=asc'
      }
    })

    if (response.status === 200) {
      console.log('API connection successful:', response.data)

      response.data.data.content.forEach((item) => {
        console.log('ID:', item.id)
        console.log('Name:', item.name)
        console.log('Additional Info:', item.additionalInfo || 'N/A')
        console.log('Created By:', item.createdBy || 'N/A')
        console.log(
          'Created Date Time:',
          item.createdDateTime ? new Date(item.createdDateTime).toLocaleString() : 'N/A'
        )
        console.log('Updated By:', item.updatedBy || 'N/A')
        console.log(
          'Updated Date Time:',
          item.updatedDateTime ? new Date(item.updatedDateTime).toLocaleString() : 'N/A'
        )
        console.log('Deleted By:', item.deletedBy || 'N/A')
        console.log(
          'Deleted Date Time:',
          item.deletedDateTime ? new Date(item.deletedDateTime).toLocaleString() : 'N/A'
        )
        console.log('----------------------------')
      })

      return response.data.data.content
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching employee data:', error)
    throw error
  }
}
