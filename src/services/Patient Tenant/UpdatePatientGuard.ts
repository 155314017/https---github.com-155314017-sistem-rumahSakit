import axios from 'axios'
import Cookies from 'js-cookie'

interface CustomError extends Error {
  responseCode?: number
}

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
    console.log('inside RegisterPatient')
    const response = await axios.put(
      'https://hms.3dolphinsocial.com:8083/v1/patient/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('inside Login1 ')
    console.log('Response register: ', response)
    return response.data
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || 'Login failed'
    )

    customError.responseCode = error.response?.status
    throw customError
  }
}

export default UpdatePatientGuards
