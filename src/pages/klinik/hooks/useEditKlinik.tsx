import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';
import "dayjs/locale/id";
import { editClinic } from '../../../services/Admin Tenant/ManageClinic/EditClinic';
import { getClinic } from '../../../services/Admin Tenant/ManageClinic/GetClinic';


type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};
export default function useEditKlinik() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const { id } = useParams();
    const [apiUrl, setApiUrl] = useState('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [selectedDays, setSelectedDays] = useState<string>("1");

    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getClinic(id);
                setApiUrl(`https://hms.3dolphinsocial.com:8083/v1/manage/clinic/${id}`);
                setName(response.name);
                setDescription(response.description);
                if (response.schedules && response.schedules.length > 0) {
                    const schedule = response.schedules[0];
                    setStartTime(dayjs.unix(schedule.startDateTime));
                    setEndTime(dayjs.unix(schedule.endDateTime));
                }
            } catch (error) {
                console.error('Error saat menghapus data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

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

    const handleTambahHari = () => {
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
    };

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };

    const showTemporaryAlertSuccess = async () => {
        setSuccessAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAlert(false);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Klinik", href: "/klinik" },
        { label: "Edit Klinik", href: "/editKlinik:id" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: name,
            deskripsiKlinik: description,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Klinik is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
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
                clinicId: id,
                name: values.namaKlinik,
                description: values.deskripsiKlinik,
                additionalInfo: "",
                schedules: schedules,
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };
            const token = Cookies.get("accessToken");

            try {
                await editClinic(data, token);
                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/klinik', { state: { successEdit: true, message: 'Gedung berhasil ditambahkan!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);

                    if (error.response) {
                        console.error('Response data:', error.response.data);
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
  return{
    formik,
    handleTambahHari,
    breadcrumbItems,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    showTemporaryAlertError,
    showTemporaryAlertSuccess,
    errorAlert,
    successAlert,
    apiUrl,
    handleImageChange,
    operationalTime,
    selectedDays,
    

  }
}
