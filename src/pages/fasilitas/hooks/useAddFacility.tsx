import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createFacility } from '../../../services/Admin Tenant/ManageFacility/CreateFacilityService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
import { createExclusions, createSchedules, KalenderData, validateInput } from '../../../services/Admin Tenant/ManageSchedule/ScheduleUtils';
import { uploadImages } from '../../../services/Admin Tenant/ManageImage/ImageUtils';
import { useFetchData } from '../../../hooks/useFetchData';
import { BuildingDataItem } from '../../../types/building.types';
import { useSuccessNotification } from '../../../hooks/useSuccessNotification';

type Building = {
    id: string;
    name: string;
};

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};


export default function useAddFacility() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [imagesData, setImagesData] = useState<ImageData[]>([])
    const kalenderRef = useRef<{ getData: () => KalenderData }>(null);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
    const [operationalCost, setOperationalCost] = useState<number>(0);
    const { isSuccess, message, showAlert } = useSuccessNotification();
    const navigate = useNavigate();

    const { data: buildingData } = useFetchData<BuildingDataItem[]>(
        Building,
        [],
        true
    );

    useEffect(() => {
        if (buildingData) {
            setGedungOptions(buildingData.map((item: BuildingDataItem) => ({
                id: item.id,
                name: item.name,
            })));
        }
    }, [buildingData])

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
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
            showAlert("Fasilitas successfully added!", 3000);

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
            showAlert("Fasilitas failed to add!", 3000);
        }
    };

    const tabs = [
        { pageNumber: 1, label: 'Informasi Fasilitas' },
        { pageNumber: 2, label: 'Jam Operasional' },
    ];

    return {
        breadcrumbItems,
        formik,
        imagesData,
        setImagesData,
        gedungOptions,
        handleImageChange,
        kalenderRef,
        currentPage,
        setCurrentPage,
        handleSaveFasilitas,
        operationalCost,
        setOperationalCost,
        tabs,
        message,
        showAlert,
        isSuccess
    }
}
