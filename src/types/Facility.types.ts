import { ScheduleDataItem } from '../services/Admin Tenant/ManageSchedule/GetScheduleByTypeIdServices'
import { OperationalSchedule } from '../services/Admin Tenant/ManageSchedule/ScheduleUtils'

export interface FacilityDataItem {
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
  masterBuildingId: string
  cost: number
  schedules: ScheduleDataItem[]
  operationalSchedule?: OperationalSchedule
}

export interface EditFacilityRequest {
  facilityId?: string
  name?: string
  description?: string
  cost?: number
  additionalInfo?: string
  masterBuildingId?: string
}

export interface CreateFacilityRequest {
  name?: string
  description?: string
  cost?: number
  additionalInfo?: string
  masterBuildingId?: string
}
