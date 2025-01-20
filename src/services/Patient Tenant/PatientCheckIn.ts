import axios from 'axios'

interface BookingCode {
  bookingCode: string
}
const PatientCheckIn = async (codeBook: BookingCode) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/check-in`,
      codeBook,
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

export default PatientCheckIn
