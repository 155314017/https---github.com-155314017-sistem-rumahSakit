import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "./useIndex";

export default function useTableGedung(
  onSuccessDelete: () => void,
  setPageNumber: (page: number) => void,
  setOrderBy: (order: string) => void,
) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [deletedItems, setDeletedItems] = useState("");
  const [sort, setSort] = useState('');

  const navigate = useNavigate();



  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageNumber(value - 1);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
    console.log(deletedItems)
  };

  useEffect(() => {
    if (sort === "Nama Gedung A-Z") {
      setOrderBy('name=asc');
    } else if (sort === "Nama Gedung Z-A") {
      setOrderBy('name=desc');
    } else if (sort === "Nomor Gedung 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort === "Nomor Gedung 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort]);

  const urutkan = [
    { value: 1, label: "Nama Gedung A-Z" },
    { value: 2, label: "Nama Gedung Z-A" },
    { value: 3, label: "Nomor Gedung 1-9" },
    { value: 4, label: "Nomor Gedung 9-1" },
  ];

  const handleDeleteSuccess = () => {
    setOpen(false);
    onSuccessDelete();
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return {
    page,
    isCollapsed,
    open,
    pageSize: PAGE_SIZE,
    handleChangePage,
    confirmationDelete,
    handleDeleteSuccess,
    toggleCollapse,
    urutkan,
    sort,
    setSort,
    navigate,
    setOpen,
  }
}
