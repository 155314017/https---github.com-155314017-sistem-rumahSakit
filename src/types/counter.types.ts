export interface CounterDataItem {
    id: string
    masterTypeId: string
    name: string
    location: string
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
  }

  export interface CreateCounterRequest {
    name: string;
    location: string;
    additionalInfo: string;
   }
  
