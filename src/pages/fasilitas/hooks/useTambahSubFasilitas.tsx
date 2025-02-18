import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { ImageData } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { createSubFacilityServices } from "../../../services/Admin Tenant/ManageSubFacility/CreateSubfacilityService";
import { FacilityServices } from "../../../services/Admin Tenant/ManageFacility/FacilityServices";
import { useFetchData } from "../../../hooks/useFetchData";
import { FacilityDataItem } from "../../../types/Facility.types";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";
type Facility = {
    id: string;
    name: string;
};

export default function useTambahSubFasilitas() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [operationalTime] = useState<string | null>(null);
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const [facilityOptions, setFacilityOptions] = useState<Facility[]>([]);
    const { isSuccess, message, showAlert } = useSuccessNotification();
    const navigate = useNavigate();

    const { data: facilityData } = useFetchData<FacilityDataItem[]>(
        FacilityServices,
        [],
        true
    );

    useEffect(() => {
        if (facilityData) {
            setFacilityOptions(facilityData.map((item: Facility) => ({
                id: item.id,
                name: item.name,
            })));
        }
    }, [facilityData])



    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Fasilitas", href: "/fasilitas" },
        { label: "Tambah SubFasilitas", href: "/tambahSubFasilitas" },
    ];

    const formik = useFormik({
        initialValues: {
            namaSubFasilitas: '',
            facilityId: '',
        },
        validationSchema: Yup.object({
            namaSubFasilitas: Yup.string().required('Nama Klinik is required'),
            facilityId: Yup.string().required('Deskripsi Klinik is required'),
        }),
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    const handleSaveKlinik = async () => {
        try {
            const kalenderData = kalenderRef.current?.getData() || { praktek: [], exclusion: [] };
            validateInput(kalenderData);
            const klinikData = {
                name: formik.values.namaSubFasilitas,
                facilityDataId: formik.values.facilityId,
            };
            // Buat klinik baru
            const { data: { id: facilityDataId } } = await createSubFacilityServices(klinikData);
            if (!facilityDataId) throw new Error('Klinik ID tidak ditemukan');
            await Promise.all([
                createSchedules(facilityDataId, kalenderData.praktek),
                createExclusions(facilityDataId, kalenderData.exclusion),
                // uploadImages(facilityDataId, imagesData)
            ]);

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
            showAlert("Subfacility failed added!", 3000);
        }
    };
    const tabs = [
        { pageNumber: 1, label: 'Informasi SubFasiitas' },
        { pageNumber: 2, label: 'Jam Operasional' },
    ];
    return {
        breadcrumbItems,
        formik,
        imagesData,
        setImagesData,
        handleImageChange,
        operationalTime,
        currentPage,
        setCurrentPage,
        kalenderRef,
        handleSaveKlinik,
        facilityOptions,
        showAlert,
        message,
        isSuccess,
        tabs
    }
}
