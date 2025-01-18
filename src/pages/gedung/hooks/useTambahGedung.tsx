import { useFormik } from "formik";
import * as Yup from "yup";
import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateBuildingService } from "../../../services/Admin Tenant/ManageBuilding/AddBuildingServices";
import { CreateImageService } from "../../../services/Admin Tenant/ManageImage/AddImageServices";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

export default function useTambahGedung() {
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);

    const navigate = useNavigate();

    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

    const showTemporaryAlertError = async () => {
        setErrorAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setErrorAlert(false);
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
            namaGedung: Yup.string().required('Nama Gedung is required'),
            alamatGedung: Yup.string().required('Alamat Gedung is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                name: values.namaGedung,
                address: values.alamatGedung,
                additionalInfo: "",
                
            };


            try {
                // Buat gedung baru
                const { data: { id: buildingId } } = await CreateBuildingService(data);

                if (!buildingId) {
                    throw new Error('Building ID tidak ditemukan');
                }
                // Persiapkan data gambar
                const imageRequest = {
                    parentId: buildingId,
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
                // Reset form dan redirect
                formik.resetForm();
                setImagesData([]);
                navigate('/gedung', { 
                    state: { 
                        successAdd: true, 
                        message: 'Gedung berhasil ditambahkan!' 
                    } 
                });

            } catch (error) {
                console.error('Gagal menambahkan gedung:', error);
                
                if (axios.isAxiosError(error)) {
                    const responseData = error.response?.data;
                    console.error('Detail error:', responseData || error.message);
                }
                
                showTemporaryAlertError();
            }
        },
    });
  return {
    formik,
    handleImageChange,
    breadcrumbItems,
    errorAlert
  }
}
