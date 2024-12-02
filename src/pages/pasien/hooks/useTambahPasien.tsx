import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';

const hari = [
    { value: 1, label: "Senin" },
    { value: 2, label: "Selasa" },
    { value: 3, label: "Rabu" },
    { value: 4, label: "Kamis" },
    { value: 5, label: "Jumat" },
    { value: 6, label: "Sabtu" },
    { value: 7, label: "Minggu" },
];

const listFasilitas = [
    { value: 1, label: "MRI" },
    { value: 1, label: "Fisioterapi" },
    { value: 1, label: "Unit Transfusi Darah (UTD)" },
]
export default function useTambahPasien() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);

    const handleTambahHari = () => {
        const selectedDayLabel = hari.find(day => day.value === selectedDay)?.label;
        const dateTime = selectedDayLabel + " " + startTime?.format("HH:mm") + " - " + endTime?.format("HH:mm");
    };

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
        onSubmit: (values) => {
        },
    });

    return{
        formik,
        breadcrumbItems,
        handleTambahHari,
        selectedDay,
        setSelectedDay,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        successAlert,
        showTemporaryAlertSuccess,
        listFasilitas,
        hari,

    }
}
