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
        // hide last border
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
            namaKlinik: '',
            deskripsiKlinik: '',
        },
        validationSchema: Yup.object({
            namaKlinik: Yup.string().required('Nama Klinik is required'),
            deskripsiKlinik: Yup.string().required('Deskripsi Klinik is required'),
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
    // const handleSelectAllMenus = (event: React.ChangeEvent<HTMLInputElement>) => {

    //     const isChecked = event.target.checked;

    //     setCheckedItems(checkedItems.map(() => isChecked)); // Update semua checkbox menu


    //     // Update status menuActions untuk semua menu

    //     const updatedMenuActions = menuActions.map(action => ({

    //         view: isChecked,

    //         edit: isChecked,

    //         delete: isChecked,

    //     }));

    //     setMenuActions(updatedMenuActions);

    // };


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
        handleIndividualCheckboxChange
    }

}
