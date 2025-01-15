import axios from 'axios'

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
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/create-appointment`,
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

export default CreateAppointment
