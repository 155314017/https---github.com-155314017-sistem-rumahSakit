import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import Cookies from "js-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createCounter } from '../../../services/Admin Tenant/ManageCounter/CreateCounterService';

const jenisKonter = [
    { value: 1, label: "Asuransi" },
    { value: 2, label: "BPJS" },
    { value: 3, label: "Umum" },
];

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};


type Schedule = {
  day: string
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
}
export default function useTambahKonter() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [schedules, setSchedules] = useState<Schedule[]>([])
    dayjs.locale('id')

    const navigate = useNavigate();

    const dayMapping: { [key: string]: number } = {
        "Senin": 1,
        "Selasa": 2,
        "Rabu": 3,
        "Kamis": 4,
        "Jumat": 5,
        "Sabtu": 6,
        "Minggu": 0,
    };

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

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };


    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Konter", href: "/konter" },
        { label: "Tambah Konter", href: "/tambahKonter" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKonter: '',
            lokasiKonter: '',
        },
        validationSchema: Yup.object({
            namaKonter: Yup.string().required('Nama Konter is required'),
            lokasiKonter: Yup.string().required('Deskripsi Konter is required'),
        }),
        onSubmit: async (values) => {

            const formattedSchedules = schedules.map(schedule => {
                const selectedDayOfWeek = dayMapping[schedule.day]
                return {
                  startDateTime: schedule.startTime.day(selectedDayOfWeek).unix(),
                  endDateTime: schedule.endTime.day(selectedDayOfWeek).unix()
                }
              })

            const data = {
                name: values.namaKonter,
                location: values.lokasiKonter,
                queueNumber: 0,
                additionalInfo: "",
                masterTypeId: "c0178047-d6e7-4ce8-b4de-54756bedf031",
                schedules: formattedSchedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };

            const token = Cookies.get("accessToken");

            try {
                await createCounter(data, token);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/konter', { state: { successAdd: true, message: 'Konters berhasil ditambahkan!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

  return {
    breadcrumbItems,
    formik,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    operationalTime,
    setOperationalTime,
    handleTambahHari,
    handleImageChange,
    successAlert,
    errorAlert,
    jenisKonter,
    showTemporaryAlertSuccess,
    handleDeleteSchedule,
    schedules
  }
}
