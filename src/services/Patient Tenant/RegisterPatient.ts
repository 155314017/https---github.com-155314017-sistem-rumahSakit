import axios from 'axios'

interface Data {
  identityNumber: string
  name: string
  phone: string
  email: string
  gender: string
  address: string
}
const RegisterPatient = async (data: Data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/patient/register`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200) {
      return response.data
    } else  if (response.status === 400) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('error', error)
  }
}

export default RegisterPatient
