/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { RoomServices, RoomDataItem } from "../../../services/Admin Tenant/ManageRoom/RoomServices";
import { useNavigate } from "react-router-dom";
import { GetBuildingById } from "../../../services/Admin Tenant/ManageBuilding/GetBuildingByIdServices";
export default function useTableRuangan(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [roomData, setRoomData] = useState<RoomDataItem[]>([]);
  const [dataIdBuilding, setDataIdBuilding] = useState<string[]>([]);
  const [deletedItems, setDeletedItems] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState('');
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize, orderBy]);

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

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await RoomServices(pageNumber, pageSize, orderBy);
      setRoomData(result);
      const buildingIds = result.map((data) => data.masterBuildingId);
      setDataIdBuilding(buildingIds);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data from API: ', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  const [buildings, setBuildings] = useState<string[]>([]);

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



  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault();
    setDeletedItems(buildingId);
    setOpen(true);
  };


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;

  const displayedData = roomData.slice((page - 1) * rowsPerPage, page * rowsPerPage);



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
    fetchDatas();
    fetchData();
    onSuccessDelete();
  };
  return {
    page,
    isCollapsed,
    open,
    setOpen,
    roomData,
    deletedItems,
    loading,
    setSort,
    displayedData,
    buildings,
    confirmationDelete,
    handleChangePage,
    rowsPerPage,
    sortir,
    urutkan,
    toggleCollapse,
    handleDeleteSuccess,
    navigate
  }
}
