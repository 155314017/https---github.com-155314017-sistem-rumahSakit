import React, { useState, useEffect } from "react";
import { CounterDataItem, CounterServices } from "../../../services/Admin Tenant/ManageCounter/CounterServices";
import { useNavigate } from "react-router-dom";

export default function useTableKonter(fetchDatas: () => void, onSuccessDelete: () => void) {
    const [page, setPage] = useState(1);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [open, setOpen] = React.useState<boolean>(false);
    const [datas, setDatas] = useState<CounterDataItem[]>([]);
    const [deletedItems, setDeletedItems] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const result = await CounterServices();
            setDatas(result); // Store the result in datas state
        } catch (error) {
            console.log('Failed to fetch data from API: ', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);


    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const rowsPerPage = 10;

    const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const urutkan = [
        { value: 1, label: "Nama Konter A-Z" },
        { value: 2, label: "Nama Konter Z-A" },
        { value: 3, label: "Nomor Konter 1-9" },
        { value: 4, label: "Nomor Konter 9-1" },
    ];

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
        event.preventDefault();
        setDeletedItems(buildingId);
        setOpen(true);
    };

    const handleDeleteSuccess = () => {
        onSuccessDelete();
        fetchDatas();
        fetchData();
    };
  return {
    page,
    setPage,
    isCollapsed,
    setIsCollapsed,
    open,
    setOpen,
    datas,
    setDatas,
    deletedItems,
    setDeletedItems,
    navigate,
    fetchData,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    toggleCollapse,
    confirmationDelete,
    handleDeleteSuccess
  }
}
