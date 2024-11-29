import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useFormik } from 'formik'
import 'dayjs/locale/id'

interface FormValues {
  operationalCost: number
}

type ImageData = {
  imageName: string
  imageType: string
  imageData: string
}

export default function useEditAmbulance() {
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
  const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null)
  const [imagesData, setImagesData] = useState<ImageData[]>([])
  const { id } = useParams()
  const [apiUrl, setApiUrl] = useState('')
  const [initialOperationalCost, setInitialOperationalCost] = useState<number>(0)
  const [errorAlert, setErrorAlert] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>('1')
  const [selectedDays, setSelectedDays] = useState<string>('1')
  dayjs.locale('id')

  const navigate = useNavigate()

  const dayMapping: { [key: string]: number } = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 0
  }

  useEffect(() => {
    if (startTime && endTime) {
      const formattedStartTime = startTime.format('HH:mm')
      const formattedEndTime = endTime.format('HH:mm')
      const dayOfWeek = startTime.format('dddd')
      console.log(errorAlert)
      console.log(formattedStartTime)
      console.log(formattedEndTime)
      const dayMapping: { [key: string]: string } = {
        Senin: '1',
        Selasa: '2',
        Rabu: '3',
        Kamis: '4',
        Jumat: '5',
        Sabtu: '6',
        Minggu: '7'
      }

      const dayValue = dayMapping[dayOfWeek] || '7'
      setSelectedDays(dayValue)
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('accessToken')
        const response = await axios.get(
          `https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              accessToken: `${token}`
            }
          }
        )

        const data = response.data.data
        setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`)
        setInitialOperationalCost(data.cost)

        if (data.schedules && data.schedules.length > 0) {
          const schedule = data.schedules[0]
          setStartTime(dayjs.unix(schedule.startDateTime))
          setEndTime(dayjs.unix(schedule.endDateTime))
        }

        setImagesData(data.images || [])
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [id])

  const formik = useFormik<FormValues>({
    initialValues: {
      operationalCost: initialOperationalCost || 0
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      operationalCost: Yup.number()
        .required('Operational Cost is required')
        .positive('Must be a positive number')
    }),
    onSubmit: async values => {
      const selectedDayOfWeek = dayMapping[selectedDay || '1']
      const adjustedStartTime = startTime?.day(selectedDayOfWeek)
      const adjustedEndTime = endTime?.day(selectedDayOfWeek)

      

      const schedules = [
        {
          startDateTime: adjustedStartTime?.unix(),
          endDateTime: adjustedEndTime?.unix()
        }
      ]

      const data = {
        ambulanceId: id,
        number: '999',
        status: 'ACTIVE',
        additionalInfo: 'hi',
        cost: values.operationalCost,
        schedules: schedules,
        images: imagesData.map(image => ({
          imageName: image.imageName || '',
          imageType: image.imageType || '',
          imageData: image.imageData || ''
        }))
      }

      const token = Cookies.get('accessToken')
      try {
         await axios.put(
          'https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              accessToken: `${token}`
            }
          }
        )
       
        navigate('/ambulance', {
          state: { successEdit: true, message: 'Gedung berhasil ditambahkan!' }
        })
      } catch (error) {
        console.error('Error editing ambulance:', error)
        setErrorAlert(true)
      }
    }
  })

  const handleImageChange = (images: ImageData[]) => {
    setImagesData(images)
  }

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Ambulance', href: '/ambulance' },
    { label: 'Edit Ambulance', href: `/editAmbulance/${id}` }
  ]
  return {
    formik,
    handleImageChange,
    imagesData,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    errorAlert,
    setErrorAlert,
    breadcrumbItems,
    apiUrl,
    selectedDays,
    initialOperationalCost
  }
}
