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
const CreateAppointmentOffline = async (data: Data) => {
  try {
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/manage/patient/create-appointment',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.data
  } catch (error) {
    console.error('error', error)
  }
}

export default CreateAppointmentOffline
