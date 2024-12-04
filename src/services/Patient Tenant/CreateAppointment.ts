import axios from 'axios'
import Cookies from 'js-cookie'

interface CustomError extends Error {
  responseCode?: number
}

interface Data {
  patientId: string
  typeOfVisit: string
  clinicId: string
  doctorId: string
  scheduleId: string
  symptoms: string
  referenceDoc: string
}
const CreateAppointment = async (data: Data) => {
  try {
    console.log('inside createAppointments')
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/patient/create-appointments',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log('inside Login1 ')
    console.log('ID pasien: ', response.data.data.id)
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

export default CreateAppointment
