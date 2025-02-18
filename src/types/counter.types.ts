import { ScheduleDataItem } from '../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { OperationalSchedule } from '../services/Admin Tenant/ManageSchedule/ScheduleUtils'

export interface CounterDataItem {
  id: string
  name: string
  location: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  schedules: ScheduleDataItem[]
  operationalSchedule?: OperationalSchedule
}

export interface CreateCounterRequest {
  name: string
  location: string
  additionalInfo: string
}
