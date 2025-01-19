import axios from 'axios'

interface PatientData {
  id: string;
  additionalInfo: string | null;
  address: string;
  birthDate: [number, number, number]; // [year, month, day]
  createdBy: string;
  createdDateTime: number;
  deletedBy: string | null;
  deletedDateTime: number | null;
  gender: string;
  masterUserId: string;
  name: string;
  phone: string;
  updatedBy: string | null;
  updatedDateTime: number | null;
  birthPlace: string;
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
    if (response.status === 200) {
      console.log("masuk Serrvice")
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Patient data:', error)
    throw error
  }
}

export default GetPatientByNIKServices
