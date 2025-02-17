export interface subFacilityDataItem {
    id: string
    name: string
    description: string
    additionalInfo: string
    code: string
    createdBy: string
    createdDateTime: number
    updatedBy: string | null
    updatedDateTime: number | null
    deletedBy: string | null
    deletedDateTime: number | null
  }

  export interface EditSubfacilityRequest {
    name: string
    facilityDataId: string
    additionalInfo: string
  }