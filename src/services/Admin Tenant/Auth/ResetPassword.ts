import axios from 'axios'

const ResetPassword = async (email: string) => {
  try {
    console.log('Sending reset password request for:', email)
    const response = await axios.post(
      'https://hms.3dolphinsocial.com:8083/v1/auth/temporary-token-request',
      { email },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.log('error', error)
  }
}

export default ResetPassword
