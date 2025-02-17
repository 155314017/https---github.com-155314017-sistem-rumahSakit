export interface AmbulanceDataItem {
  id: string
  number: string
  status: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  cost: number
}

export interface CreateAmbulanceRequest {
  number?: string
  status?: string
  cost?: number
  additionalInfo?: string
}

export interface EditAmbulanceRequest {
  ambulanceId?: string
  number?: string
  status?: string
  additionalInfo?: string
  cost?: number
}
