import axios from 'axios'

// Interface untuk properti dalam response API
export interface RegistrationDatumDtoItem {
  typeOfVisit: string
}

export interface PatientDataItem {
  id: string
  masterUserID: string
  name: string
  birthDate: string
  gender: string
  address: string
  phone: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string
  updatedDateTime: number
  deletedBy: string
  deletedDateTime: number
  registrationDatumDto: RegistrationDatumDtoItem
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
    content: PatientDataItem[]
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

const API_URL =
  'https://hms.3dolphinsocial.com:8083/v1/manage/patient/?pageNumber=0&pageSize=10&orderBy=id=asc';

export const PatientServices = async (): Promise<PatientDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL)

    if (response.status === 200) {
      // Ambil array `content` yang berisi semua data pasien
      const patients = response.data.data.content

      // Akses semua `registrationDatumDto` dari setiap pasien
      const registrationData = patients.map((patient) => patient.registrationDatumDto)

      // Cetak semua `registrationDatumDto` ke konsol
      console.log('All registrationDatumDto:', registrationData)

      // Cetak data pasien pertama (opsional)
      if (patients.length > 0) {
        console.log('First patient registrationDatumDto:', patients[0].registrationDatumDto)
      }

      return patients // Kembalikan semua data pasien
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching patient services:', error)
    throw error // Re-throw untuk penanganan oleh pemanggil fungsi
  }
}
