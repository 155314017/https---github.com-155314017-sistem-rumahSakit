import axios from 'axios'

interface BookingCode {
  bookingCode: string
}
const PatientCheckIn = async (codeBook: BookingCode) => {
  try {
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/patient/check-in',
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
