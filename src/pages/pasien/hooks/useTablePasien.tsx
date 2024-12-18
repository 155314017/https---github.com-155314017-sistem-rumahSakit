import React, { useState, useEffect } from "react";
import { PatientDataItem, PatientServices } from "../../../services/ManagePatient/PatientServices";
export default function useTablePasien() {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [datas, setDatas] = useState<PatientDataItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await PatientServices();
                setDatas(result);
                console.log(result);
            } catch (error) {
                console.log('Failed to fetch data from API: ', error);
            }
        };

        fetchData();
    }, []);

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
  return {
    page,
    setPage,
    isCollapsed,
    setIsCollapsed,
    datas,
    setDatas,
    handleChangePage,
    rowsPerPage,
    displayedData,
    sortir,
    urutkan,
    toggleCollapse,
    confirmationDelete
  }
}
