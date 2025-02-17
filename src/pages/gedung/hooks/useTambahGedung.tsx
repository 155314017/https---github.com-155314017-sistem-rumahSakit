import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateBuildingService } from "../../../services/Admin Tenant/ManageBuilding/AddBuildingServices";
import { uploadImages } from "../../../services/Admin Tenant/ManageImage/ImageUtils";
import { ImageItem } from "../../../types/images.types";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";


export default function useTambahGedung() {
    const [imagesData, setImagesData] = useState<ImageItem[]>([]);
    const { isSuccess, message, showAlert } = useSuccessNotification();
    const navigate = useNavigate();

    const handleImageChange = (images: ImageItem[]) => {
        setImagesData(images);
    };

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Gedung", href: "/gedung" },
        { label: "Tambah Gedung", href: "/tambahGedung" },
    ];

    const formik = useFormik({
        initialValues: {
            namaGedung: '',
            alamatGedung: '',
        },
        validationSchema: Yup.object({
            namaGedung: Yup.string().required('Nama Gedung wajib diisi'),
            alamatGedung: Yup.string().required('Alamat Gedung wajib diisi'),
        }),
        onSubmit: async (values) => {
            const data = {
                name: values.namaGedung,
                address: values.alamatGedung,
                additionalInfo: "",
            };
            try {
                const { data: { id: buildingId } } = await CreateBuildingService(data);
                if (!buildingId) {
                    throw new Error('Building ID tidak ditemukan');
                }
                await Promise.all([
                    uploadImages(buildingId, imagesData)
                ]);
                formik.resetForm();
                setImagesData([]);
                navigate('/gedung', {
                    state: {
                        successAdd: true,
                        message: 'Gedung berhasil ditambahkan!'
                    }
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    return error.response?.data;
                }
                showAlert("Error Adding Building", 3000);
            }
        },
    });

    return {
        formik,
        handleImageChange,
        breadcrumbItems,
        message,
        isSuccess
    }
}
