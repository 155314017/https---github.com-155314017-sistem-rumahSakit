/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "./useIndex";

export default function useTableKonter(
  onSuccessDelete: () => void,
  setPageNumber: (page: number) => void,
  setOrderBy: (order: string) => void

) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [deletedItems, setDeletedItems] = useState("");
  const navigate = useNavigate();
  const [sort, setSort] = useState('');

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageNumber(value - 1);
  }


  useEffect(() => {
    if (sort == "Nama Konter A-Z") {
      setOrderBy('name=asc');
    } else if (sort == "Nama Konter Z-A") {
      setOrderBy('name=desc');
    } else if (sort == "Nomor Konter 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort == "Nomor Konter 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort])

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
    setOpen(false);
    onSuccessDelete();
  };
  return {
    page,
    isCollapsed,
    open,
    setOpen,
    deletedItems,
    navigate,
    handleChangePage,
    urutkan,
    toggleCollapse,
    confirmationDelete,
    setSort,
    handleDeleteSuccess,
    setPageNumber,
    pageSize: PAGE_SIZE
  }
}
