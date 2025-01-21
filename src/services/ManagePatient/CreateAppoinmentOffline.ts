import axios from 'axios'

interface Data {
  nomorAntrian: any | undefined;
  namaDokter: string;
  clinic: string;
  tanggalReservasi: string;
  jadwalKonsul: string | null;
  bookingCode: string
}
const CreateAppointmentOffline = async (data: Data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/patient/create-appointment`,
      data,
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

export default CreateAppointmentOffline
