import axios from 'axios'

type QueueResponse = {
  responseCode: string
  statusCode: string
  message: string
  data: {
    queueNumber: number
  }
}

const GenerateQueuePatientServices = async (clinicId: string): Promise<number | string> => {
  try {
    const response = await axios.get<QueueResponse>(
      `https://hms.3dolphinsocial.com:8083/v1/manage/counter/${clinicId}/generate-queue`
    )
    return response.data.data.queueNumber
  } catch (error) {
    console.error('Error fetching queue number:', error)
    return 'tidak ada'
  }
}

export default GenerateQueuePatientServices
