import axios from 'axios'
import Cookies from 'js-cookie'

interface CustomError extends Error {
  responseCode?: number
}

interface Data {
  patientId: string | undefined
  typeOfVisit: string
  clinicId: string
  doctorId: string
  scheduleId: string
  symptoms: string
  referenceDoc: string
}
const CreateAppointment = async (data: Data) => {
  console.log('Creating appointment with data:', data)
  try {
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/patient/create-appointments',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Appointment created:', response.data)
    return response.data
  } catch (error: any) {
    const customError: CustomError = new Error(
      error.response?.data?.message || error.message || 'Creation failed'
    )
    customError.responseCode = error.response?.status
    console.error('Error in CreateAppointment:', customError)
    throw customError
  }
}

export default CreateAppointment
