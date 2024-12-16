import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { createClinic } from '../../../services/Admin Tenant/ManageClinic/CreateClinic';

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

export default function useTambahKlinik() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [operationalTime] = useState<string | null>(null);
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const navigate = useNavigate();

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };


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

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Klinik", href: "/klinik" },
        { label: "Tambah Klinik", href: "/tambahKlinik" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            deskripsiKlinik: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Klinik is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
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
                name: values.namaKlinik,
                description: values.deskripsiKlinik,
                additionalInfo: "",
                schedules: formattedSchedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");

            try {
                await createClinic(data, token);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/klinik', { state: { successAdd: true, message: 'Klinik berhasil ditambahkan!' } });
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);
                    if (error.response) {
                        console.error('Response status:', error.response.status);
                    } else {
                        console.error('Error message:', error.message);
                    }
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };
  return {
    breadcrumbItems,
    handleTambahHari,
    formik,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    imagesData,
    setImagesData,
    handleImageChange,
    successAlert,
    errorAlert,
    operationalTime,
    showTemporaryAlertSuccess,
    schedules,
    handleDeleteSchedule
  }
}
