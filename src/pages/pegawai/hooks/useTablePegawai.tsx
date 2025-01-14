import { useState, useEffect } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom";



import { EmployeeDataItem, EmployeeServices } from "../../../services/Admin Tenant/ManageEmployee/EmployeeServices";


export default function useTablePegawai() {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [datas, setDatas] = useState<EmployeeDataItem[]>([]);
  // const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await EmployeeServices();
        setDatas(result); // Store the result in datas state
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
    { value: 1, label: "Role Pegawai" },
    { value: 2, label: "Role Pegawai" },
    { value: 3, label: "Role Pegawai" },
  ];

  const urutkan = [
    { value: 1, label: "Terbaru" },
    { value: 2, label: "Terlama" },
    { value: 3, label: "Nama Pegawai A-Z" },
    { value: 4, label: "Nama Pegawai Z-A" },
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
    confirmationDelete,
    navigate
  }
}
