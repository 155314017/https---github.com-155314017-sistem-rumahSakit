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

    console.log('inside Login1 ')
    console.log('Response register: ', response)
    return response.data
  } catch (error) {
    console.log('error', error)
  }
}

export default VerifyOTPPatient
