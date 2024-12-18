import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import 'dayjs/locale/id'
import { EditAmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/EditAmbulanceServices'
import { getAmbulanceByIdService } from '../../../services/Admin Tenant/ManageAmbulance/GetAmbulanceByIdService'

interface FormValues {
  operationalCost: number
}

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
  const [edit, setEdit] = useState(false)
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [operationalSchedules, setOperationalSchedules] = useState<string[]>([])

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
        const response = await getAmbulanceByIdService(id);

        const data = response
        setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/ambulance/${id}`)
        setInitialOperationalCost(data?.cost || 0)

        const schedules = data?.schedules || []
        const schedule = schedules[0]
        const startTime = dayjs.unix(schedule.startDateTime)
        const endTime = dayjs.unix(schedule.endDateTime)
        setStartTime(startTime)
        setEndTime(endTime)


        console.log(schedules)

        const operationalSchedules: string[] = schedules.map((schedule) => {
          const formattedStartTime = new Date(schedule.startDateTime * 1000);
          const formattedEndTime = new Date(schedule.endDateTime * 1000);
          const dayOfWeek = new Intl.DateTimeFormat('id-ID', { weekday: 'long' });
          
          const startDay = dayOfWeek.format(formattedStartTime);
            const startHours = formattedStartTime.getHours().toString().padStart(2, '0');
            const startMinutes = formattedStartTime.getMinutes().toString().padStart(2, '0');
            const endHours = formattedEndTime.getHours().toString().padStart(2, '0');
            const endMinutes = formattedEndTime.getMinutes().toString().padStart(2, '0');
            return `${startDay}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
        })
        setOperationalSchedules(operationalSchedules)
       
        console.log("operational Schedules",operationalSchedules)
        console.log("Schedules",schedules)
        setImagesData(data?.images || [] )
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [id])

  const handleEditSchedules = () => {
      setEdit(true)
      setSelectedDay
  }

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

      try {
         await EditAmbulanceServices(data)
       
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
    initialOperationalCost,
    operationalSchedules,
    handleEditSchedules
  }
}
