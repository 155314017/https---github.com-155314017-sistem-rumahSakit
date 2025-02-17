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

  
export interface FacilityRequest {
    name: string
    facilityDataId: string
    description: string
    cost: number
    additionalInfo: string
    schedules: { startDateTime: number; endDateTime: number }[]
    images: { imageName: string; imageType: string; imageData: string }[]
  }
  


