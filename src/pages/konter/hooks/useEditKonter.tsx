import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import Cookies from "js-cookie";
import axios from 'axios';
import "dayjs/locale/id";
import { useNavigate, useParams } from 'react-router-dom';

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

export default function useEditKonter() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [apiUrl, setApiUrl] = useState('');
    const { id } = useParams();
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [selectedDays, setSelectedDays] = useState<string>("1");
    const navigate = useNavigate();

    const dayMapping: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 0,
    };

    useEffect(() => {
        if (startTime && endTime) {
            const formattedStartTime = startTime.format("HH:mm");
            const formattedEndTime = endTime.format("HH:mm");
            const dayOfWeek = startTime.format("dddd");
            const dayMapping: { [key: string]: string } = {
                "Monday": "1",
                "Tuesday": "2",
                "Wednesday": "3",
                "Thursday": "4",
                "Friday": "5",
                "Saturday": "6",
                "Sunday": "7"
            };

            const dayValue = dayMapping[dayOfWeek] || "7";
            setSelectedDays(dayValue);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("accessToken");
                const response = await axios.get(`https://hms.3dolphinsocial.com:8083/v1/manage/counter/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    }
                });
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/counter/${id}`);
                setName(response.data.data.name);
                setLocation(response.data.data.location);
                if (response.data.data.schedules && response.data.data.schedules.length > 0) {
                    const schedule = response.data.data.schedules[0];
                    setStartTime(dayjs.unix(schedule.startDateTime));
                    setEndTime(dayjs.unix(schedule.endDateTime));
                }
            } catch (error) {
                console.error('Error saat menghapus data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleTambahHari = () => {
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
    };

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
        { label: "Edit Konter", href: "/editKonter/:id" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKonter: name,
            lokasiKonter: location,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaKonter: Yup.string().required('Nama Konter is required'),
            lokasiKonter: Yup.string().required('Deskripsi Konter is required'),
        }),
        onSubmit: async (values) => {
            const selectedDayOfWeek = dayMapping[selectedDay || "1"];
            const adjustedStartTime = startTime?.day(selectedDayOfWeek);
            const adjustedEndTime = endTime?.day(selectedDayOfWeek);
            const schedules = [
                {
                    startDateTime: adjustedStartTime?.unix(),
                    endDateTime: adjustedEndTime?.unix(),
                }
            ];

            const data = {
                counterId: id,
                name: values.namaKonter,
                location: values.lokasiKonter,
                schedules: schedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");

            try {
                await axios.put('https://hms.3dolphinsocial.com:8083/v1/manage/counter/', data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': `${token}`
                    },
                });
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/konter', { state: { successEdit: true, message: 'Gedung berhasil ditambahkan!' } })

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
    formik,
    imagesData,
    setImagesData,
    handleImageChange,
    handleTambahHari,
    breadcrumbItems,
    operationalTime,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    successAlert,
    errorAlert,
    jenisKonter,
    selectedDays,
    apiUrl
  }
}
