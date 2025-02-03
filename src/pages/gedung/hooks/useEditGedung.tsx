import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EditBuildingService } from "../../../services/Admin Tenant/ManageBuilding/EditBuildingService";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { editImages } from "../../../services/Admin Tenant/ManageImage/ImageUtils";

type ImageData = {
    imageName: string;
    imageType: string;
    imageData: string;
};

interface FormValues {
    namaGedung: string;
    alamatGedung: string;
}

export default function useEditGedung() {
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("accessToken");
                const response = await GetBuildingById(id,token);
                setName(response.name);
                setAddress(response.address);
            } catch (error) {
                console.error('Error saat menghapus data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);


    const handleImageChange = (images: ImageData[]) => {
        setImagesData(images);
    };

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
        { label: "Gedung", href: "/gedung" },
        { label: "Edit Gedung", href: `/editGedung/${id}` },
    ];

    const formik = useFormik<FormValues>({
        initialValues: {
            namaGedung: name,
            alamatGedung: address,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            namaGedung: Yup.string().required('Nama Gedung is required'),
            alamatGedung: Yup.string().required('Alamat Gedung is required'),
        }),
        onSubmit: async (values) => {
            const data = {
                buildingId: id,
                name: values.namaGedung,
                address: values.alamatGedung,
                additionalInfo: ""
            };

            try {
                await EditBuildingService(data);
                await editImages(id || "", imagesData);

                showTemporaryAlertSuccess();
                formik.resetForm();
                setImagesData([]);
                navigate('/gedung', { state: { successEdit: true, message: 'Gedung berhasil diubah!' } })
            } catch (error) {
                console.error('Error submitting form:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Axios error message:', error.message);
                    console.error('Response data:', error.response?.data);
                    if (error.response) {
                        console.error('Response status:', error.response.status);
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
  return{
      breadcrumbItems,
      formik,
      imagesData,
      handleImageChange,
      loading,
      successAlert,
      errorAlert,
      id
  }
}
