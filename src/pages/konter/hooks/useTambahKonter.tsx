import axios from 'axios';
import dayjs from 'dayjs';
import { useFormik } from "formik";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { ImageData, uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { createCounter } from '../../../services/Admin Tenant/ManageCounter/CreateCounterService';

const jenisKonter = [
    { value: 1, label: "Asuransi" },
    { value: 2, label: "BPJS" },
    { value: 3, label: "Umum" },
];

export default function useTambahKonter() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [successAlert, setSuccessAlert] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(null);
    const [operationalTime, setOperationalTime] = useState<string | null>(null);
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);

    const navigate = useNavigate();

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
            console.log(values);
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

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

    const handleSaveKonter = async () => {
        try {
            const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };

            // Validasi input schedule
            validateInput(kalenderData);

            // Data untuk CreateAmbulanceService
            const konterData = {
                name: formik.values.namaKonter,
                location: formik.values.lokasiKonter,
                additionalInfo: '',
                masterTypeId: "c0178047-d6e7-4ce8-b4de-54756bedf031",
                queueNumber: 0
            };

            // Buat konter baru
            const { data: { id: konterId } } = await createCounter(konterData);
            if (!konterId) throw new Error('Konter ID tidak ditemukan');

            // Proses secara parallel untuk optimasi
            await Promise.all([
                createSchedules(konterId, kalenderData.praktek),
                createExclusions(konterId, kalenderData.exclusion),
                uploadImages(konterId, imagesData)
            ]);

            // Reset state dan redirect
            formik.resetForm();
            setImagesData([]);

            navigate('/konter', {
                state: {
                    successAdd: true,
                    message: 'Konter berhasil ditambahkan!'
                }
            });
        } catch (error) {
            console.error('[DEBUG] Error saat menyimpan konter:', error);
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                console.error('[DEBUG] Detail error dari server:', responseData || error.message);
            }
            showTemporaryAlertError();
        }
    };

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
        handleImageChange,
        successAlert,
        errorAlert,
        jenisKonter,
        showTemporaryAlertSuccess,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        kalenderRef,
        handleSaveKonter
    }
}
