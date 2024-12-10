import { useFormik } from "formik";
import * as Yup from "yup";
import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreateBuildingService } from "../../../services/Admin Tenant/ManageBuilding/AddBuildingServices";

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
                images: imagesData.map(image => ({
                    imageName: image.imageName || "",
                    imageType: image.imageType || "",
                    imageData: image.imageData || "",
                })),
            };

            try {
                await CreateBuildingService(data);
                formik.resetForm();
                setImagesData([]);
                navigate('/gedung', { state: { successAdd: true, message: 'Gedung berhasil ditambahkan!' } })
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Response data:', error.response?.data);
                    if (error.response) {
                        console.error('Response data:', error.response.data);
                    } else {
                        console.error('Error message:', error.message);
                    }
                    showTemporaryAlertError();
                } else {
                    console.error('Unexpected error:', error);
                }
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
