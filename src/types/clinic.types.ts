export interface ClinicDataItem {
    id: string
    name: string
    description: string
    additionalInfo: string
    createdBy: string
    createdDateTime: number
    updatedBy: string | null
    updatedDateTime: number | null
    deletedBy: string | null
    deletedDateTime: number | null
    images: string[]
    schedules: { id: string; startDateTime: number; endDateTime: number }[]
    operationalSchedule?: string
    code: string
  }
  
