import axios from 'axios'

interface PatientData {
  identityNumber: string
  fullName: string
  birthDateAndPlace: string
  phoneNumber: string
}

interface PatientResponse {
  responseCode: string
  statusCode: string
  message: string
  data: PatientData
}

const baseUrl = 'https://hms.3dolphinsocial.com:8083'

const GetPatientByNIKServices = async (nik: string): Promise<PatientResponse | null> => {
  try {
    const response = await axios.get<PatientResponse>(`${baseUrl}/v1/manage/patient/get/${nik}`)
    return response.data
  } catch (error) {
    console.error('Error fetching patient by NIK:', error)
    return null
  }
}

export default GetPatientByNIKServices
