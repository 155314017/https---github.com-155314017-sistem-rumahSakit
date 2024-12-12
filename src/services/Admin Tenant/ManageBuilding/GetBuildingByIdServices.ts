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
      console.log('API connection successful:', response.data)

      // Menampilkan data gedung di console
      const item = response.data.data
        console.log("print response",response.data.data)
        console.log('ID:', item.id)
        console.log('Name:', item.name)
        console.log('Address:', item.address)
        console.log('Additional Info:', item.additionalInfo)
        console.log('Created By:', item.createdBy)
        console.log('Created Date Time:', new Date(item.createdDateTime * 1000).toLocaleString())
        console.log('Updated By:', item.updatedBy)
        console.log(
          'Updated Date Time:',
          item.updatedDateTime ? new Date(item.updatedDateTime * 1000).toLocaleString() : 'N/A'
        )
        console.log('Deleted By:', item.deletedBy)
        console.log(
          'Deleted Date Time:',
          item.deletedDateTime ? new Date(item.deletedDateTime * 1000).toLocaleString() : 'N/A'
        )
        console.log('Images:', item.images)
        console.log('----------------------------')
      

      return response.data.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching building data:', error)
    throw error
  }
}
