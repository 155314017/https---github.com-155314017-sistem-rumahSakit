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