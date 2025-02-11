import axios from 'axios'
import { PaginatedResponse } from '../../types/api.types';
import { PatientDataItem } from '../../types/patient.types';

// Interface untuk properti dalam response API


const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/patient/?pageNumber=0&pageSize=10&orderBy=id=asc`;


export const PatientServices = async (
  pageNumber: number = 0,
  pageSize: number = 100,
  orderBy: string = 'createdDateTime=asc'
): Promise<PaginatedResponse<PatientDataItem>> => {
  try {
    const response = await axios.get<PaginatedResponse<PatientDataItem>>(API_URL,{
      params: {
        pageNumber,
        pageSize,
        orderBy
      }
    }
    )

    if (response.status === 200) {
      const patients = response.data

      

      

      return patients // Kembalikan semua data pasien
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching patient services:', error)
    throw error // Re-throw untuk penanganan oleh pemanggil fungsi
  }
}
