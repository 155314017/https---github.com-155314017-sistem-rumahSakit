import axios from 'axios'

interface BookingCode {
  bookingCode: string
}
const PatientCheckIn = async (bookingCode: BookingCode) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/registration/by-booking-code?bookingCode=${bookingCode.bookingCode}`,
      
    )
    return response.data
  } catch (error) {
    console.error('error', error)
  }
}

export default PatientCheckIn
