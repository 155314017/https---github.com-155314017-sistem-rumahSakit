import axios, { AxiosResponse } from 'axios'

const BASE_URL = 'https://hms.3dolphinsocial.com:8083/v1/manage/patient'

export interface GuardianData {
  guardianType: string
  guardianName: string
  guardianRelation: string
  guardianIdentityNumber: string
  guardianPhone: string
  guardianEmail: string
  guardianAddress: string
  guardianGender: string
  // guardianBirthDate: number
  // guardianBirthPlace: string
}

export const getGuardianData = async (patientId: string): Promise<GuardianData> => {
  try {
    const response: AxiosResponse = await axios.get(`${BASE_URL}/${patientId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = response.data.data as GuardianData
    return {
      guardianType: data.guardianType,
      guardianName: data.guardianName,
      guardianRelation: data.guardianRelation,
      guardianIdentityNumber: data.guardianIdentityNumber,
      guardianPhone: data.guardianPhone,
      guardianEmail: data.guardianEmail,
      guardianAddress: data.guardianAddress,
      guardianGender: data.guardianGender,
      // guardianBirthDate: data.guardianBirthDate,
      // guardianBirthPlace: data.guardianBirthPlace
    }
  } catch (error) {
    console.error('Error fetching guardian data:', error)
    throw error
  }
}
