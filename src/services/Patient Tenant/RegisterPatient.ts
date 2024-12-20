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
    console.log('inside RegisterPatient')
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/patient/register',
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
    alert("Terjadi kesalahan saat mengirim ulang kode. Silakan coba lagi.");
    console.log('error', error)
  }
}

export default RegisterPatient
