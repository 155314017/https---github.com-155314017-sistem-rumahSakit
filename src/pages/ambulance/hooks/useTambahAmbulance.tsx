import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import 'dayjs/locale/id'
import { CreateAmbulanceServices } from '../../../services/Admin Tenant/ManageAmbulance/CreateAmbulanceService'

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
  const [currentPage, setCurrentPage] = useState<number>(1);
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
              const normalizedDay = schedule.day.trim().charAt(0).toUpperCase() + schedule.day.slice(1).toLowerCase();
              const selectedDayOfWeek = dayMapping[normalizedDay];
          
              const parsedStartTime = dayjs(schedule.startTime, 'HH:mm', true);
              const parsedEndTime = dayjs(schedule.endTime, 'HH:mm', true);
          
              const referenceDate = dayjs().startOf('week');
          
              const startDateTime = referenceDate
                .day(selectedDayOfWeek)
                .set('hour', parsedStartTime.hour())
                .set('minute', parsedStartTime.minute())
                .set('second', 0)
          
              const endDateTime = referenceDate
                .day(selectedDayOfWeek)
                .set('hour', parsedEndTime.hour())
                .set('minute', parsedEndTime.minute())
                .set('second', 0)
          
              return {
                startDateTime: startDateTime.valueOf(),
                endDateTime: endDateTime.valueOf()
              };
            }).filter(schedule => schedule !== null);

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


      try {
        await CreateAmbulanceServices(data);
       
        navigate('/ambulance', {
          state: { successAdd: true, message: 'Gedung berhasil ditambahkan!' }
        })
      } catch (error) {
        console.error('Error submitting form:', error)
        showTemporaryAlertError()
      }
    }
  })

  const getPageStyle = (page: number) => {
    if (page === currentPage) {
        return { color: "#8F85F3", cursor: "pointer", fontWeight: "bold" };
    } else if (page < currentPage) {
        return { color: "#8F85F3", cursor: "pointer" };
    } else {
        return { color: "black", cursor: "pointer" };
    }
};

const getBorderStyle = (page: number) => {
    if (page === currentPage) {
        return {
            display: "flex",
            border: "1px solid #8F85F3",
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
        };
    } else if (page < currentPage) {
        return {
            display: "flex",
            border: "1px solid #8F85F3",
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8F85F3",
            color: "white",
        };
    } else {
        return {
            display: "flex",
            border: "1px solid #8F85F3",
            width: "38px",
            height: "38px",
            borderRadius: "8px",
            justifyContent: "center",
            alignItems: "center",
            color: "#8F85F3",
        };
    }
};

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
    schedules,
    currentPage,
    setCurrentPage,
    getPageStyle,
    getBorderStyle
  }

}
