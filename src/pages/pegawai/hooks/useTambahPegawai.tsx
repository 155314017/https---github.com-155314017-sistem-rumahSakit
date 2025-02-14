// hooks/useTambahPegawai.tsx

import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import {
    TableRow,
    TableContainer,
} from "@mui/material";

export interface Exclusion {
    id: number;
    date: string;
    type: string;
    time: string;
}

export default function useTambahPegawai() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gender, setGender] = useState('');



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
            namaPegawai: Yup.string()
                .required('Nama Pegawai diperlukan')
                .matches(/^[A-Za-z]+$/, 'Nama hanya boleh berisi huruf (A-Z)'),
            nip: Yup.string().required('NIP diperlukan'),
            nik: Yup.string()
                .required('NIK diperlukan')
                .matches(/^\d+$/, 'NIK hanya boleh berisi angka')
                .length(16, 'NIK harus terdiri dari 16 digit'),
            tanggalLahir: Yup.string().required('Tanggal Lahir diperlukan'),
            alamatTinggal: Yup.string().required('Alamat Tinggal diperlukan'),
            jenisKelamin: Yup.string().required('Jenis Kelamin diperlukan'),
            status: Yup.string()
                .required('Status diperlukan')
                .matches(/^[A-Za-z]+$/, 'Status hanya boleh berisi huruf (A-Z)'),
            email: Yup.string().email('Email tidak valid').required('Email diperlukan'),
            nomorHandphone: Yup.string()
                .required('Isi nomor telepon')
                .matches(/^[0-9]{10,15}$/, 'Nomor telepon tidak valid')
                .min(10, 'Nomor telepon minimal 10 digit')
                .max(15, 'Nomor telepon maksimal 15 digit'), // Perbaiki max digit
            rolePegawai: Yup.string().required('Role Pegawai diperlukan'),
            jenisSpesialis: Yup.string().required('Jenis Spesialisasi diperlukan'),
            tipeAntrian: Yup.string().required('Tipe Antrian diperlukan'),
            biayaPenanganan: Yup.number().required('Biaya Penanganan diperlukan'),
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



    // State untuk mengelola status checkbox
    const [checkedItems, setCheckedItems] = useState<boolean[]>(labels.slice(0).map(() => false));

    const [menuActions, setMenuActions] = useState(
        labels.slice(1).map(() => ({
            view: false,
            edit: false,
            delete: false,
        }))
    );

    const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

    // Derived state: Menentukan apakah 'Pilih Semua Tindakan' harus disabled

    // Handler untuk checkbox individual (menu)
    const handleCheckboxChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = event.target.checked;
        setCheckedItems(updatedCheckedItems);

        const updatedMenuActions = [...menuActions];

        if (!event.target.checked) {
            // Jika menu di-uncheck, reset tindakan aksesnya
            updatedMenuActions[index - 1].view = false;
            updatedMenuActions[index - 1].edit = false;
            updatedMenuActions[index - 1].delete = false;
            setMenuActions(updatedMenuActions);

            // 'Pilih Semua Tindakan' harus di-uncheck jika ada menu yang di-uncheck
            setSelectAllChecked(false);
        } else {
            // Jika menu di-check, tindakan akses tetap seperti sebelumnya
            setMenuActions(updatedMenuActions);

            // Periksa apakah semua tindakan akses pada semua menu yang dipilih sudah tercentang
            const allSelectedActionsChecked = updatedCheckedItems.slice(1).every((isChecked, idx) => {
                if (isChecked) {
                    const actions = updatedMenuActions[idx];
                    return actions.view && actions.edit && actions.delete;
                }
                return true; // Jika menu tidak dipilih, abaikan
            });

            setSelectAllChecked(allSelectedActionsChecked);
        }
    };

    // Handler untuk checkbox 'Pilih Semua Tindakan'
    const handleSelectAllActions = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setSelectAllChecked(isChecked);

        const updatedMenuActions = menuActions.map((action, idx) => {
            if (checkedItems[idx + 1]) { // Memeriksa apakah menu ini dipilih
                return {
                    view: isChecked,
                    edit: isChecked,
                    delete: isChecked,
                };
            }
            return action; // Menu tidak dipilih, tetap tidak berubah
        });
        setMenuActions(updatedMenuActions);
    };

    // Handler untuk checkbox 'Pilih Semua Menu'
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setCheckedItems(checkedItems.map(() => isChecked));

        if (!isChecked) {
            // Reset semua tindakan akses jika "Pilih semua menu" di-uncheck
            setMenuActions(menuActions.map(() => ({
                view: false,
                edit: false,
                delete: false,
            })));
            setSelectAllChecked(false); // Reset select all actions
        } else {
            // Jika "Pilih semua menu" di-check, reset "Pilih Semua Tindakan"
            setSelectAllChecked(false);
        }
    };

    // Handler untuk checkbox individual (tindakan akses)
    const handleIndividualCheckboxChange = (menuIndex: number, action: keyof typeof menuActions[0]) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedMenuActions = [...menuActions];

        // Perbarui tindakan akses berdasarkan action yang diubah
        if (action === 'view') {
            updatedMenuActions[menuIndex].view = event.target.checked;
        } else if (action === 'edit') {
            updatedMenuActions[menuIndex].edit = event.target.checked;
        } else if (action === 'delete') {
            updatedMenuActions[menuIndex].delete = event.target.checked;
        }

        setMenuActions(updatedMenuActions);
        const allActionsChecked = updatedMenuActions.every(item => item.view && item.edit && item.delete);
        setSelectAllChecked(allActionsChecked);
    };

    const handleSubmitPage3 = () => {
        const selectedMenus = labels.slice(1).map((label, index) => ({
            menu: label,
            isSelected: checkedItems[index + 1],
            actions: checkedItems[index + 1] ? menuActions[index] : { view: false, edit: false, delete: false },
        }));

        selectedMenus.forEach(menu => {
            if (menu.isSelected) {
                console.log(`${menu.menu}: view=${menu.actions.view}, edit=${menu.actions.edit}, delete=${menu.actions.delete}`);
            } else {
                console.log(`${menu.menu}: ${menu.isSelected}`);
            }
        });
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
        checkedItems,
        menuActions,
        selectAllChecked,
        handleCheckboxChange,
        handleSelectAll,
        handleSelectAllActions,
        handleIndividualCheckboxChange,
        gender,
        setGender,

        handleSubmitPage3,
    }
}
