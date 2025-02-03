import axios from 'axios'

interface UserData {
  id: string
  identityNumber: string
  firstName: string
  lastName: string
  birthDateAndPlace: string
  phone: string
  email: string
  gender: string
  address: string
}

interface UserResponse {
  responseCode: string
  statusCode: string
  message: string
  data: UserData
}

const GetUserByNIK = async (nik: string): Promise<UserResponse | null> => {
  try {
    const response = await axios.get<UserResponse>(
      `${
        import.meta.env.VITE_APP_BACKEND_URL_BASE
      }/v1/manage/user/by-identity-number?identityNumber=${nik}`
    )
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`API responded with status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching Patient data:', error)
    throw error
  }
}

export default GetUserByNIK
