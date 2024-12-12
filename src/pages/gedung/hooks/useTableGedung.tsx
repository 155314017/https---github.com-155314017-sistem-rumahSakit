import React, { useState, useEffect } from "react";
import { Building, BuildingDataItem } from "../../../services/Admin Tenant/ManageBuilding/Building";
import { useNavigate } from "react-router-dom";

export default function useTableGedung(fetchDatas: () => void, onSuccessDelete: () => void) {
    const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState<BuildingDataItem[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [sort, setSort] = useState('');
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, orderBy]);

  const fetchData = async () => {
    try {
      const result = await Building(pageNumber, pageSize, orderBy);
      setDatas(result);
    } catch (error) {
      console.log("Failed to fetch data from API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };

  const rowsPerPage = 10;
  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    if (sort == "Nama Gedung A-Z"){
      setOrderBy('name=asc');
    } else if (sort == "Nama Gedung Z-A"){
      setOrderBy('name=desc');
    } else if (sort == "Nomor Gedung 1-9"){
      setOrderBy('createdDateTime=asc');
    } else if (sort == "Nomor Gedung 9-1"){
      setOrderBy('createdDateTime=desc');
    }
  }, [sort])

  const urutkan = [
    { value: 1, label: "Nama Gedung A-Z" },
    { value: 2, label: "Nama Gedung Z-A" },
    { value: 3, label: "Nomor Gedung 1-9" },
    { value: 4, label: "Nomor Gedung 9-1" },
  ];


  const handleDeleteSuccess = () => {
    fetchDatas();
    console.log("Delete success");
    setOpen(false);
    onSuccessDelete();
    fetchData();
    
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  return {
    page,
    isCollapsed,
    open,
    datas,
    deletedItems,
    displayedData,
    rowsPerPage,
    handleChangePage,
    confirmationDelete,
    handleDeleteSuccess,
    toggleCollapse,
    urutkan,
    sort,
    setPageNumber,
    setPageSize,
    setSort,
    navigate,
    setOpen
  }
}
