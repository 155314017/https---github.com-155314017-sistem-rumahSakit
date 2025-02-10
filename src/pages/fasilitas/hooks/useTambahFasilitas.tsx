import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createFacility } from '../../../services/ManageFacility/CreateFacilityService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';

type Building = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};


export default function useTambahFasilitas() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imagesData, setImagesData] = useState<ImageData[]>([])
    const [errorAlert, setErrorAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [operationalCost, setOperationalCost] = useState<number>(0);
    const navigate = useNavigate();

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
        { label: "Tambah Fasilitas", href: "/tambahFasilitas" },
    ];

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

    const formik = useFormik({
        initialValues: {
            deskripsiKlinik: '',
            masterBuildingId: '',
            namaFasilitas: '',
            operationalCost: 0
        },
        validationSchema: Yup.object({
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik wajib diisi'),
            masterBuildingId: Yup.string().required('Gedung wajib dipilih'),
            namaFasilitas: Yup.string().required('Nama Fasilitas wajib diisi'),
            operationalCost: Yup.number().required('Biaya wajib diisi').min(0, 'Nilai harus positif')
        }),
        onSubmit: async (values) => {
            console.log(values)
        },
    });

    const handleSaveFasilitas = async () => {
        try {
            const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
            validateInput(kalenderData);

            const facilityData = {
                name: formik.values.namaFasilitas,
                description: formik.values.deskripsiKlinik,
                additionalInfo: '',
                masterBuildingId: formik.values.masterBuildingId,
                cost: operationalCost
            };

            // Buat fasilitas baru
            const { data: { id: facilityId } } = await createFacility(facilityData);
            if (!facilityId) throw new Error('Facility ID tidak ditemukan');

            await Promise.all([
                createSchedules(facilityId, kalenderData.praktek),
                createExclusions(facilityId, kalenderData.exclusion),
                uploadImages(facilityId, imagesData)
            ]);

            formik.resetForm();
            setImagesData([]);
            showTemporaryAlertSuccess();

            navigate('/fasilitas', {
                state: {
                    successAdd: true,
                    message: 'Fasilitas berhasil ditambahkan!'
                }
            });
        } catch (error) {
            console.error('[DEBUG] Error saat menyimpan fasilitas:', error);
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
        gedungOptions,
        handleImageChange,
        errorAlert,
        successAlert,
        kalenderRef,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        handleSaveFasilitas,
        operationalCost,
        setOperationalCost
    }
}
