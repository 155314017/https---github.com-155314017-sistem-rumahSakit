/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../../services/Admin Tenant/ManageRoom/CreateRoomService';
import { Building } from '../../../services/Admin Tenant/ManageBuilding/Building';
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
                    console.error(error.message);
                } else {
                    console.error(error);
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
            namaRuangan: '',
            masterBuildingId: '',
            jenisRuangan: '',
        },
        validationSchema: Yup.object({
            namaRuangan: Yup.string().required('Nama Ruangan wajib diisi'),
            masterBuildingId: Yup.string().required('Gedung wajib diisi'),
            jenisRuangan: Yup.string().required('Jenis Ruangan wajib diisi'),
        }),
        onSubmit: async (values) => {
            const data = {
                name: values.namaRuangan,
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

                await Promise.all([
                    uploadImages(roomId, imagesData)
                ]);

                formik.resetForm();
                setImagesData([]);

                navigate('/ruangan', {
                    state: {
                        successAdd: true,
                        message: 'Ruangan berhasil ditambahkan!'
                    }
                });

            } catch (error) {
                showTemporaryAlertError();
            }
        },
    });

    return {
        formik,
        breadcrumbItems,
        setImagesData,
        gedungOptions,
        errorAlert,
    }
}
