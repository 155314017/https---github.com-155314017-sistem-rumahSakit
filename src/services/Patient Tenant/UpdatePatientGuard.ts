import axios from 'axios'

interface Data {
  patientId: string | undefined
  guardianIdentityNumber: string | undefined
  guardianName: string | undefined
  guardianPhone: string | undefined
  guardianEmail: string | undefined
  guardianGender: string | undefined
  guardianAddress: string | undefined
  guardianType: string | undefined
  guardianRelation: string | undefined
  guardianBirthDate: string | undefined
  guardianBirthPlace: string | undefined
}
const UpdatePatientGuards = async (data: Data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/register`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    
    return response.data
  } catch (error) {
    console.error('error', error)
  }
}

export default UpdatePatientGuards
