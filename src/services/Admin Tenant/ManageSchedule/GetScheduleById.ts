import axios from 'axios'

const baseURL = 'https://hms.3dolphinsocial.com:8083/v1/manage/schedule'

export interface ScheduleData {
  id: string
  startDateTime: number
  endDateTime: number
  typeId: string
  additionalInfo: string | null
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTIme: string | null
  deletedBy: string | null
  deletedDateTime: string | null
}

export const getScheduleById = async (id: string): Promise<ScheduleData> => {
  try {
    const response = await axios.get<{ data: ScheduleData }>(`${baseURL}/${id}`)
    if (response.status === 200) {
      return response.data.data
    } else {
      throw new Error(`Error fetching schedule with id ${id}. Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching schedule:', error)
    throw error
  }
}
