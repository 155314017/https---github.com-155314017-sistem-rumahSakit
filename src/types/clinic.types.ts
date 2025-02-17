import { OperationalSchedule } from "../services/Admin Tenant/ManageSchedule/ScheduleUtils"

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
    operationalSchedule?: OperationalSchedule
    code: string
  }
  
