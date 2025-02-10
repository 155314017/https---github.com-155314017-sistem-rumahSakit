import axios from 'axios'
import Cookies from 'js-cookie'
import { BaseResponse } from '../../types/api.types'

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

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/`

// Function to create a facility
export const createFacility = async (data: {
  name: string
  description: string
  additionalInfo: string
  masterBuildingId: string
  cost: number
}): Promise<BaseResponse<FacilityDataItem>> => {
  const token = Cookies.get('accessToken')

  if (!token) {
    throw new Error('No access token found.')
  }

  try {
    const response = await axios.post<BaseResponse<FacilityDataItem>>(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        accessToken: token
      }
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error creating facility:', error)
    throw error
  }
}
