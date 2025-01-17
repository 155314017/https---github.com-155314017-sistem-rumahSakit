import axios from 'axios'

interface Data {
  email: string
  code: string
}
const VerifyOTPPatient = async (data: Data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/verify`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('error', error)
  }
}

export default VerifyOTPPatient
