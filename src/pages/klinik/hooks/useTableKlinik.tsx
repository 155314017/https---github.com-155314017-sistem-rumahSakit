import React, { useState, useEffect } from "react";
import { Clinic, ClinicDataItem } from "../../../services/Admin Tenant/ManageClinic/Clinic";
import { useNavigate } from "react-router-dom";

interface TableClinicProps {
    fetchDatas: () => void;
    onSuccessDelete: () => void;
  }
export default function useTableKlinik() {
    const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [datas, setDatas] = useState<ClinicDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await Clinic();
      setDatas(result); 
    } catch (error) {
      console.log('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {

    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  const handleDeleteSuccess = ({ onSuccessDelete, fetchDatas }: TableClinicProps) => {
    onSuccessDelete();
    fetchDatas();
    fetchData();
  };

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const urutkan = [
    { value: 1, label: "Nomor klinik 1-9" },
    { value: 2, label: "Nomorklinik 9-1" },
    { value: 3, label: "Nama klinik A-Z" },
    { value: 4, label: "Nama klinik Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return{
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
    confirmationDelete,
    handleDeleteSuccess,
    handleChangePage,
    rowsPerPage,
    displayedData,
    urutkan,
    toggleCollapse,
    navigate
  }
}
