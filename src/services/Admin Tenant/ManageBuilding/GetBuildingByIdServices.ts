import axios from 'axios'

export interface BuildingDataItem {
  id: string
  name: string
  address: string
  additionalInfo: string
  createdBy: string
  createdDateTime: number
  updatedBy: string | null
  updatedDateTime: number | null
  deletedBy: string | null
  deletedDateTime: number | null
  images: {imageName: string; imageType: string; imageData: string }[];
}

export interface ApiResponse {
  status: number
  message: string
  data: BuildingDataItem
}





export const GetBuildingById = async (
  id : string | undefined,
  token : string | undefined 
): Promise<BuildingDataItem> => {
  try {
    const response = await axios.get<ApiResponse>(`https://hms.3dolphinsocial.com:8083/v1/manage/building/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'accessToken': `${token}`
        }
    })

    if (response.status === 200) {
      
      

      return response.data.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
