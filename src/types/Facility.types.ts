export interface FacilityDataItem {
  id: string
  name: string
  description: string
  additionalInfo: string
  masterBuildingId: string
  cost: number
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
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
