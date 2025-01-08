import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import {
    TableRow,
    TableContainer,
} from "@mui/material";

export default function useTambahPegawai() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gender, setGender] = useState('');
    const [senin, setSenin] = useState<boolean>(false);
    const [selasa, setSelasa] = useState<boolean>(false);
    const [rabu, setRabu] = useState<boolean>(false);
    const [kamis, setKamis] = useState<boolean>(false);
    const [jumat, setJumat] = useState<boolean>(false);
    const [sabtu, setSabtu] = useState<boolean>(false);
    const [minggu, setMinggu] = useState<boolean>(false);

    const labels = [
        "Pilih semua menu",
        "Dashboard Admin",
        "Dashboard Dokter",
        "Dashboard Lab",
        "Dashboard Farmasi",
        "Dashboard Kasir",
    ];

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
        // Hide last border
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const StyledTableContainer = styled(TableContainer)`
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #8f85f3;
            border-radius: 10px;
            border: 2px solid #f1f1f1;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: #6c63ff;
            cursor: pointer;
        }
    `;

    const breadcrumbItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pegawai", href: "/pegawai" },
        { label: "Tambah Pegawai", href: "/tambahPegawai" },
    ];

    const rolePegawai = [
        { value: 1, label: "Dokter Spesialis" },
        { value: 2, label: "Dokter Umum" },
        { value: 3, label: "Customer Services" },
        { value: 4, label: "Manajemen" },
    ];

    const jamOperasional = [
        { value: 1, label: "07:00 am" },
        { value: 2, label: "08:00 am" },
        { value: 3, label: "09:00 am" },
        { value: 4, label: "10:00 am" },
        { value: 4, label: "11:00 am" },
        { value: 4, label: "12:00 am" },
        { value: 4, label: "01:00 pm" },
        { value: 4, label: "02:00 pm" },
        { value: 4, label: "03:00 pm" },
        { value: 4, label: "04:00 pm" },
        { value: 4, label: "05:00 pm" },
        { value: 4, label: "06:00 pm" },
        { value: 4, label: "07:00 pm" },
        { value: 4, label: "08:00 pm" },
        { value: 4, label: "09:00 pm" },
    ];

    const formik = useFormik({
        initialValues: {
            nip: '12341234',
            nik: '',
            namaPegawai: '',
            tanggalLahir: '',
            alamatTinggal: '',
            jenisKelamin: '',
            status: '',
            email: '',
            nomorHandphone: '',
            rolePegawai: '',
            jenisSpesialis: '',
            namaKlinik: '',
            tipeAntrian: '',
            biayaPenanganan: '',
        },
        validationSchema: Yup.object({
            namaPegawai: Yup.string().required('Nama Pegawai diperlukan'),
            nip: Yup.string().required('NIP diperlukan'),
            nik: Yup.string().required('NIK diperlukan'),
            tanggalLahir: Yup.string().required('Tanggal Lahir diperlukan'),
            alamatTinggal: Yup.string().required('Alamat Tinggal diperlukan'),
            jenisKelamin: Yup.string().required('Jenis Kelamin diperlukan'),
            status: Yup.string().required('Status diperlukan'),
            email: Yup.string().email('Email tidak valid').required('Email diperlukan'),
            nomorHandphone: Yup.string()
                .required('Isi nomor telepon')
                .matches(/^[0-9]{10,15}$/, 'Nomor telepon tidak valid')
                .min(10, 'Nomor telepon minimal 10 digit')
                .max(14, 'Nomor telepon maksimal 14 digit'),
            rolePegawai: Yup.string().required('Role Pegawai diperlukan'),
            jenisSpesialis: Yup.string().required('Jenis Spesialisasi diperlukan'),
            tipeAntrian: Yup.string().required('Tipe Antrian diperlukan'),
            biayaPenanganan: Yup.string().required('Biaya Penanganan diperlukan'),
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
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

    // State untuk mengelola status checkbox
    const [checkedItems, setCheckedItems] = useState(labels.slice(0).map(() => false));

    const [menuActions, setMenuActions] = useState(
        labels.slice(1).map(() => ({
            view: false,
            edit: false,
            delete: false,
        }))
    );

    const [selectAllChecked, setSelectAllChecked] = useState(false);

    // Handler untuk checkbox individual
    const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = event.target.checked;
        setCheckedItems(updatedCheckedItems);
    };

    const handleSelectAllActions = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAllChecked(isChecked);

        // Update status tindakan untuk semua menu
        const updatedMenuActions = menuActions.map(() => ({
            view: isChecked,
            edit: isChecked,
            delete: isChecked,
        }));
        setMenuActions(updatedMenuActions);
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setCheckedItems(checkedItems.map(() => isChecked));
    };

    const handleIndividualCheckboxChange = (menuIndex: number, action: keyof typeof menuActions[0]) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedMenuActions = [...menuActions];
        updatedMenuActions[menuIndex][action] = event.target.checked;
        setMenuActions(updatedMenuActions);

        // Update "Pilih semua tindakan" berdasarkan status individual
        const allActionsChecked = updatedMenuActions.every(item => item[action]);
        setSelectAllChecked(allActionsChecked);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return {
        currentPage,
        setCurrentPage,
        labels,
        StyledTableRow,
        StyledTableContainer,
        breadcrumbItems,
        rolePegawai,
        formik,
        getPageStyle,
        getBorderStyle,
        checkedItems,
        setCheckedItems,
        menuActions,
        setMenuActions,
        selectAllChecked,
        setSelectAllChecked,
        handleCheckboxChange,
        handleSelectAll,
        handleSelectAllActions,
        handleIndividualCheckboxChange,
        gender,
        setGender,
        senin,
        setSenin,
        selasa,
        setSelasa,
        rabu,
        setRabu,
        kamis,
        setKamis,
        jumat,
        setJumat,
        sabtu,
        setSabtu,
        minggu,
        setMinggu,
        jamOperasional,
        isModalOpen,
        handleOpenModal,
        handleCloseModal
    }
}
