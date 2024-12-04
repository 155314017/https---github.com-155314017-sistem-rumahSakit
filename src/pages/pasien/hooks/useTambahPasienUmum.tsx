import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";


export default function useTambahPasienUmum() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [guardFullPage, setGuardFullPage] = useState(true);
    const [patientFullPage, setPatientFullsPage] = useState(true);
    const [switchValue, setSwitchValue] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [mainPages, setMainPages] = useState(true);
    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pasien", href: "/pasien" },
        { label: "Tambah Pasien", href: "/tambahPasien/Umum" },
    ];

    const formik = useFormik({
        initialValues: {
            namaKlinik: '',
            deskripsiKlinik: '',
            nik: '',
            // phonePasien: '',
            caraDatang: '',
            namaPenanggungJawab: '',
            phonePenanggungJawab: '',
            hubungan: '',
            jenisPembayaran: '',
            jenisKunjungan: '',
            poli: '',
            doctor: '',
            keluhan: '',
            riwayatPenyakit: '',
            alergi: '',
        },
        validationSchema: Yup.object({
            nik: Yup.string().required('NIK is required'),
            // phonePasien: Yup.string().required('No. Handphone Pasien is required'),
            caraDatang: Yup.string().required('Cara datang is required'),
            namaPenanggungJawab: Yup.string().required('Nama lengkap penanggung jawab is required'),
            phonePenanggungJawab: Yup.string().required('No. Handphone penanggung jawab is required'),
            hubungan: Yup.string().required('Hubungan penanggung jawab dengan pasien is required'),
            jenisPembayaran: Yup.string().required('Jenis Pembayaran is required'),
            jenisKunjungan: Yup.string().required('Jenis Kunjungan is required'),
            poli: Yup.string().required('Poli yang dituju is required'),
            doctor: Yup.string().required('Pilih Dokter is required'),
            keluhan: Yup.string().required('Keluhan pasien is required'),
            riwayatPenyakit: Yup.string().required('Riwayat penyakit is required'),
            alergi: Yup.string().required('Alergi is required'),
        }),
        onSubmit: (values) => {
            // console.log('Form submitted:', values);
        },
    });

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMethod(event.target.value);
    };

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

    const isCurrentPageValid = () => {
        if (currentPage === 1) {
            return formik.values.nik;
        } else if (currentPage === 2) {
            return formik.values.caraDatang && formik.values.namaPenanggungJawab && formik.values.phonePenanggungJawab && formik.values.hubungan;
        } else if (currentPage === 3) {
            return formik.values.jenisPembayaran && formik.values.jenisKunjungan && formik.values.poli && formik.values.doctor && formik.values.keluhan && formik.values.riwayatPenyakit && formik.values.alergi;
        }
        return false;
    };

    const handleSwitchChange = (value: boolean) => {
        setSwitchValue(value);
        console.log('Switch value:', value);
    };

    return {
        formik,
        breadcrumbItems,
        currentPage,
        setCurrentPage,
        getPageStyle,
        getBorderStyle,
        isCurrentPageValid,
        handleSwitchChange,
        switchValue,
        selectedMethod,
        setSelectedMethod,
        mainPages,
        setMainPages,
        guardFullPage,
        setGuardFullPage,
        patientFullPage,
        setPatientFullsPage,
        handleRadioChange

    }
}
