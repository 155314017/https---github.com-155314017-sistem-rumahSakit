import axios from 'axios'

interface Data {
  email: string
  code: string
}
const VerifyOTPPatient = async (data: Data) => {
  try {
    console.log('inside RegisterPatient')
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/patient/verify',
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
    console.log('error', error)
  }
}

export default VerifyOTPPatient
