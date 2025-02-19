
import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { PatientDataItem } from '../../../types/patient.types';
import { useFetchData } from '../../../hooks/useFetchData';
import GetPatientByUserIdServices from '../../../services/Patient Tenant/GetPatientByUserIdServices';
import { useParams } from 'react-router-dom';

export default function useEditGeneralPatients() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const { id } = useParams();
    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pasien", href: "/pasien" },
        { label: "Tambah pasien", href: "/editPasien/Umum" },
    ];

    const { data: patientData } = useFetchData<PatientDataItem>(
            GetPatientByUserIdServices,
            [id],
            true,
            // true
        );

    useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    setName(patientData.name);
                } catch (error) {
                    console.error('Error saat menghapus data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, [patientData.name]);


    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            deskripsiKlinik: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Pasien is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Pasien is required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });


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

    return {
        name,
        loading,
        formik,
        breadcrumbItems,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle
    }
}
