import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { createSubfacility } from '../../../services/ManageFacility/CreateSubfacilityService';

type Facility = {
    id: string;
    name: string;
};

export default function useTambahSubFasilitas() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [errorAlert, setErrorAlert] = useState(false);
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacilityData = async () => {
            try {
                const response = await axios.get('https://hms.3dolphinsocial.com:8083/v1/manage/facility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc', {
                    timeout: 10000
                });
                setFacilityOptions(response.data.data.content.map((item: Facility) => ({
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
        fetchFacilityData();
    }, []);

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
        const dateTime = selectedDay + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
        setOperationalTime(dateTime);
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
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Tambah SubFasilitas", href: "/tambahSubFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            masterFacilityId: '',
            namaSubFasilitas: '',
        },
        validationSchema: Yup.object({
            masterFacilityId: Yup.string().required('Gedung is required'),
            namaSubFasilitas: Yup.string().required('SubFacility Name is required'),
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
                name: values.namaSubFasilitas,
                facilityDataId: values.masterFacilityId,
                additionalInfo: "hai",
                schedules: schedules,
            };
            const token = Cookies.get("accessToken");

            try {
                await createSubfacility(data, token);
                formik.resetForm();
                navigate('/fasilitas', { state: { successAddSub: true, message: 'Fasilitas berhasil ditambahkan!' } })
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
    dayMapping,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    operationalTime,
    setOperationalTime,
    handleTambahHari,
    showTemporaryAlertSuccess,
    showTemporaryAlertError,
    facilityOptions,
    successAlert,
    errorAlert,
    navigate,
    
  }
}
