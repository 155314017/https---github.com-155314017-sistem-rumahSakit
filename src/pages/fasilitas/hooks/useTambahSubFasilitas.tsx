import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { ImageData } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { createSubFacilityServices } from "../../../services/ManageFacility/CreateSubfacilityService";
type Facility = {
    id: string;
    name: string;
};

export default function useTambahSubFasilitas() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [successAlert, setSuccessAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [operationalTime] = useState<string | null>(null);
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFacilityData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/facility/?pageNumber=0&pageSize=10&orderBy=createdDateTime=asc`, {
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
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Tambah SubFasilitas", href: "/tambahSubFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            facilityId: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Klinik is required'),
            facilityId: Yup.string().required('Deskripsi Klinik is required'),
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

    const handleSaveKlinik = async () => {
        try {
            const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };

            // Validasi input schedule
            validateInput(kalenderData);

            // Data untuk CreateClinic
            const klinikData = {
                name: formik.values.namaKlinik,
                facilityDataId: formik.values.facilityId,
            };
            // Buat klinik baru
            const { data: { id: facilityDataId } } = await createSubFacilityServices(klinikData);
            if (!facilityDataId) throw new Error('Klinik ID tidak ditemukan');

            // Proses secara parallel untuk optimasi
            await Promise.all([
                createSchedules(facilityDataId, kalenderData.praktek),
                createExclusions(facilityDataId, kalenderData.exclusion),
                // uploadImages(facilityDataId, imagesData)
            ]);

            // Reset state dan redirect
            formik.resetForm();
            setImagesData([]);

            navigate('/fasilitas', {
                state: {
                    successAdd: true,
                    message: 'Fasilitas berhasil ditambahkan!'
                }
            });
        } catch (error) {
            console.error('[DEBUG] Error saat menyimpan klinik:', error);
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
        imagesData,
        setImagesData,
        handleImageChange,
        successAlert,
        errorAlert,
        operationalTime,
        showTemporaryAlertSuccess,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        kalenderRef,
        handleSaveKlinik,
        facilityOptions
    }
}
