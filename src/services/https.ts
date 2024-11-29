import axios from 'axios'

const https = (token: string) => {
  const headers: Record<string, string> = {}
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return axios.create({
    headers,
    baseURL: import.meta.env.VITE_APP_BACKEND_URL_BASE
  })
}

export default https
