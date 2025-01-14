import axios from 'axios'
import dayjs from 'dayjs'

// Interface untuk properti dalam response API
export interface MasterUser {
  id: string
  masterGroupId: string | null
  masterDashboardId: string | null
  identityNumber: string
  email: string
  firstName: string
  lastName: string | null
  nickname: string | null
  phone: string
  maritalStatus: string | null
  updatedDateTime: number | null
  createdDateTime: number
  deletedDateTime: number | null
  statusActive: string | null
  additionalInfo: string | null
  updatedBy: string | null
  createdBy: string
  deletedBy: string | null
}

export interface ScheduleDatum {
  id: string
  startDateTime: number
  endDateTime: number
  typeId: string
  additionalInfo: string | null
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: string | null
}

export interface RegistrationDatumDto {
  id: string
  patientDataId: string
  masterClinicId: string
  doctorDataId: string
  counterDataId: string | null
  discount: string | null
  status: string | null
  additionalInfo: string | null
  createdBy: string | null
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  referenceDoc: string
  typeOfVisit: string
  symptomps: string
  scheduleDataId: string
  scheduleDatum: ScheduleDatum
  bookingCode: string
}

export interface PatientDataItem {
  id: string
  masterUserId: string
  name: string
  birthDate: number[] // Represented as [year, month, day]
  gender: string
  address: string
  phone: string
  additionalInfo: string | null
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  guardianType: string
  guardianName: string
  guardianRelation: string
  guardianIdentityNumber: string
  guardianPhone: string
  guardianEmail: string
  guardianAddress: string
  guardianGender: string
  guardianBirthDate: string | null
  guardianBirthPlace: string
  masterUser: MasterUser
  registrationDatumDto: RegistrationDatumDto
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


  const convertUnixToReadableTime = (timestamp: number) => {
    const date = dayjs(timestamp);
    const dayOfWeek = date.format('dddd'); // Hari dalam seminggu
    const time = date.format('HH:mm'); // Format waktu HH:mm
    return { day: dayOfWeek, time };
  };

export const PatientServices = async (): Promise<PatientDataItem[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL)

    if (response.status === 200) {
      const patients = response.data.data.content

      patients.forEach((item) => {
        if (item.registrationDatumDto && item.registrationDatumDto.scheduleDatum) {
          // Ambil jadwal tunggal
          const schedule = item.registrationDatumDto.scheduleDatum;
          const startDate = convertUnixToReadableTime(schedule.startDateTime);
          const endDate = convertUnixToReadableTime(schedule.endDateTime);

          const startDay = startDate.day;
          const start = startDate.time;
          const end = endDate.time;

          // Format jadwal operasional
          item.operationalSchedule = `${startDay}, ${start} - ${end}`;
        } else {
          item.operationalSchedule = 'No schedule available.';
        }
      });


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
