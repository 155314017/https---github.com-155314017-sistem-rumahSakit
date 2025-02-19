/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
import { PAGE_SIZE } from "./useIndex";
import useConfirmationDelete from "../../../hooks/useConfirmationDelete";
export default function useTableRoom(
  onSuccessDelete: () => void,
  setPageNumber: (page: number) => void,
  setOrderBy: (order: string) => void,
  dataIdBuilding: string[]
) {
  const [buildings, setBuildings] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState<string | null>("");
  const [sort, setSort] = useState('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [page, setPage] = useState(1);
  const {confirmationDelete} = useConfirmationDelete( setOpen, setDeletedItems )

  const navigate = useNavigate();

  useEffect(() => {
    if (sort == "Nama Gedung A-Z") {
      setOrderBy('name=asc');
    } else if (sort == "Nama Gedung Z-A") {
      setOrderBy('name=desc');
    } else if (sort == "Nomor Gedung 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort == "Nomor Gedung 9-1") {
      setOrderBy('createdDateTime=desc');
    } else {
      setOrderBy('createdDateTime=asc');
    }
  }, [sort])

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const responses = await Promise.all(
          dataIdBuilding.map((id) => GetBuildingById(id))
        );

        const facilitiesData = responses.map((response) => {
          const name = response.name;
          return name ? name : "Data Gedung Tidak Tercatat";
        });

        setBuildings(facilitiesData);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (dataIdBuilding.length > 0) {
      fetchBuildings();
    }
  }, [dataIdBuilding]);



 


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageNumber(value - 1);
  };


  const sortir = [
    { value: 1, label: "Nama Gedung" },
    { value: 2, label: "Jenis Ruangan" },
    { value: 3, label: "Kuota ruangan tersedia" },
    { value: 4, label: "Kuota ruangan penuh" },
  ];

  const urutkan = [
    { value: 1, label: "Nama Gedung A-Z" },
    { value: 2, label: "Nama Gedung Z-A" },
    { value: 3, label: "Tarif ruangan tertinggi" },
    { value: 4, label: "Tarif ruangan terendah" },
    { value: 5, label: "Nomor ruangan 1-9" },
    { value: 6, label: "Nomor ruangan 9-1" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleDeleteSuccess = () => {
    onSuccessDelete();
  };
  return {
    page,
    isCollapsed,
    open,
    setOpen,
    deletedItems,
    setSort,
    buildings,
    confirmationDelete,
    handleChangePage,
    sortir,
    urutkan,
    toggleCollapse,
    handleDeleteSuccess,
    navigate,
    pageSize: PAGE_SIZE,
    setDeletedItems
  }
}
