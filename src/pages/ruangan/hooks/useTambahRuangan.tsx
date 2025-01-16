import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../../services/Admin Tenant/ManageRoom/CreateRoomService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
import { CreateImageService } from '../../../services/Admin Tenant/ManageImage/AddImageServices';

type Building = {
    id: string;
    name: string;
};


type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function useTambahRuangan() {
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [gedungOptions, setGedungOptions] = useState<Building[]>([]);
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
    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Ruangan", href: "/ruangan" },
        { label: "Tambah Ruangan", href: "/tambahRuangan" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            masterBuildingId: '',
            jenisRuangan: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Ruangan is required'),
            masterBuildingId: Yup.string().required('Gedung is required'),
            jenisRuangan: Yup.string().required('Jenis Ruangan is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                name: values.namaKlinik,
                masterBuildingId: values.masterBuildingId,
                type: values.jenisRuangan,
                additionalInfo: "add info,"
            };

            const token = Cookies.get("accessToken");
            try {
                const response = await createRoom(data, token);
                const roomId = response.data.id;

                if (!roomId) {
                    throw new Error('Room ID tidak ditemukan');
                }

                // Persiapkan data gambar
                const imageRequest = {
                    parentId: roomId,
                    images: imagesData.map(({ imageName = "", imageType = "", imageData = "" }) => ({
                        imageName,
                        imageType,
                        imageData
                    }))
                };

                // Upload gambar jika ada
                if (imagesData.length > 0) {
                    await CreateImageService(imageRequest);
                }

                formik.resetForm();
                setImagesData([]);
                navigate('/ruangan', { state: { successAdd: true, message: 'Ruangan berhasil ditambahkan!' } });
            } catch (error) {
                console.error('Error adding room:', error);
                showTemporaryAlertError();
            }
        },
    });

    return {
        formik,
        breadcrumbItems,
        imagesData,
        setImagesData,
        gedungOptions,
        errorAlert,
        setErrorAlert,
        showTemporaryAlertError

    }
}
