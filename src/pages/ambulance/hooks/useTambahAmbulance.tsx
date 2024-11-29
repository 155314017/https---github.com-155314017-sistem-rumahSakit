import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'dayjs/locale/id'

type ImageData = {
  imageName: string
  imageType: string
  imageData: string
}

type Schedule = {
  day: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
}

export default function useTambahAmbulance() {
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const [errorAlert, setErrorAlert] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  dayjs.locale('id')

  const navigate = useNavigate()

  const dayMapping: { [key: string]: number } = {
    Senin: 1,
    Selasa: 2,
    Rabu: 3,
    Kamis: 4,
    Jumat: 5,
    Sabtu: 6,
    Minggu: 0
  }

  interface FormValues {
    operationalCost: number
  }

  const handleTambahHari = () => {
    if (selectedDay && startTime && endTime) {
      const newSchedule: Schedule = {
        day: selectedDay,
        startTime: startTime,
        endTime: endTime
      }
      setSchedules([...schedules, newSchedule])
      setSelectedDay('')
      setStartTime(null)
      setEndTime(null)
    }
  }

  const handleDeleteSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index))
  }

  const showTemporaryAlertError = async () => {
    setErrorAlert(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setErrorAlert(false)
  }

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images)
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Ambulance', href: '/ambulance' },
    { label: 'Tambah Ambulance', href: '/tambahAmbulance' }
  ]

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: 0
    },
    validationSchema: Yup.object({
      operationalCost: Yup.number()
        .required('Operational Cost is required')
        .positive('Must be a positive number')
    }),
    onSubmit: async values => {
      const formattedSchedules = schedules.map(schedule => {
        const selectedDayOfWeek = dayMapping[schedule.day]
        return {
          startDateTime: schedule.startTime.day(selectedDayOfWeek).unix(),
          endDateTime: schedule.endTime.day(selectedDayOfWeek).unix()
        }
      })

      const data = {
        number: '12345',
        status: 'ACTIVE',
        additionalInfo: 'hi',
        cost: values.operationalCost || 0,
        schedules: formattedSchedules,
        images: imagesData.map(image => ({
          imageName: image.imageName || '',
          imageType: image.imageType || '',
          imageData: image.imageData || ''
        }))
      }

      const token = Cookies.get('accessToken')

      try {
        const response = await axios.post(
          'https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              accessToken: `${token}`
            }
          }
        )
        console.log('Response:', response.data)
        navigate('/ambulance', {
          state: { successAdd: true, message: 'Gedung berhasil ditambahkan!' }
        })
      } catch (error) {
        console.error('Error submitting form:', error)
        showTemporaryAlertError()
      }
    }
  })

  return {
    errorAlert,
    handleTambahHari,
    handleDeleteSchedule,
    handleImageChange,
    breadcrumbItems,
    formik,
    startTime,
    endTime,
    setSelectedDay,
    setStartTime,
    setEndTime,
    schedules
  }

}
