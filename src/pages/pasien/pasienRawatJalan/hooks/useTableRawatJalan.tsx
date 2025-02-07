/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Data from "../../../../dummyData/dataPasien"
export default function useTableRawatJalan() {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selected, setSelected] = useState<string | null>(null);

    // Fungsi untuk mengubah tombol yang dipilih
    const handleButtonClick = (buttonName: string) => {
        setSelected(buttonName);
    };

    // setDatas(Data)
    const datas = Data


    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const sortir = [
        { value: 1, label: "Pria" },
        { value: 2, label: "Wanita" },
    ];

    const urutkan = [
        { value: 1, label: "Nama Pasien A-Z" },
        { value: 2, label: "Nama Pasien Z-A" },
        { value: 3, label: "Nomor Pasien 1-9" },
        { value: 4, label: "Nomor Pasien 9-1" },
    ];

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        // setOpen(true);
    };

    const getButtonStyle = (buttonName: string) => {
        return {
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '18px',
            padding: '12px',
            mr: 1,
            bgcolor: '#ffff',
            border: '1px solid #8F85F3',
            color: '#8F85F3',
            width: 'fit-content',
            borderRadius: '8px',
            height: '44px',
            '&:hover': {
                backgroundColor: "#8F85F3",
                color: '#ffff',
            },
            ...(selected === buttonName && {
                backgroundColor: "#8F85F3", // Warna latar belakang ketika dipilih
                color: "#fff", // Warna teks ketika dipilih
            }),
        };
    };

    return {
        page,
        setPage,
        isCollapsed,
        setIsCollapsed,
        datas,
        handleChangePage,
        rowsPerPage,
        displayedData,
        sortir,
        urutkan,
        toggleCollapse,
        confirmationDelete,
        getButtonStyle,
        handleButtonClick,
    }
}