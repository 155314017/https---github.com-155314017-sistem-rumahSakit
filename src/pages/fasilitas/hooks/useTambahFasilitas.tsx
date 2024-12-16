
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import dayjs from 'dayjs';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createFacility } from '../../../services/ManageFacility/CreateFacilityService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
type Building = {
    id: string;
    name: string;
};

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
export default function useTambahFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [operationalCost, setOperationalCost] = useState<string | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const navigate = useNavigate();
    dayjs.locale('id');

    useEffect(() => {
        const fetchGedungData = async () => {
            try {
                const response = await Building();
                setGedungOptions(response.map((item: Building) => ({
                    id: item.id,
                    name: item.name,
                })));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Axios error:", error.message);
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        };
        fetchGedungData();
    }, []);
    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
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
    };

    const handleDeleteSchedule = (index: number) => {
        setSchedules(schedules.filter((_, i) => i !== index))
      }

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
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Tambah Fasilitas", href: "/tambahFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            deskripsiKlinik: '',
            masterBuildingId: '',
            namaFasilitas:'',
        },
        validationSchema: Yup.object({
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            namaFasilitas: Yup.string().required('Facility Name is required'),
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
                name: values.namaFasilitas,
                masterBuildingId: values.masterBuildingId,
                description: values.deskripsiKlinik,
                cost: operationalCost ? parseInt(operationalCost.replace(/\D/g, '')) : 0,
                additionalInfo: "hai",
                schedules: formattedSchedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");
            try {
                await createFacility(data, token);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/fasilitas', { state: { successAdd: true, message: 'Fasilitas berhasil ditambahkan!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
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
    operationalTime,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    imagesData,
    setImagesData,
    operationalCost,
    setOperationalCost,
    handleTambahHari,
    gedungOptions,
    handleImageChange,
    errorAlert,
    successAlert,
    showTemporaryAlertSuccess,
    handleDeleteSchedule,
    schedules
  }
}
