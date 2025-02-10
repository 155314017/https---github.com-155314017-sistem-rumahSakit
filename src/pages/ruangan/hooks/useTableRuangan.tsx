import React, { useState, useEffect } from "react";

import { RoomServices, RoomDataItem } from "../../../services/Admin Tenant/ManageRoom/RoomServices";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export interface BuildingDataItem {
    id: string;
    name: string;
    address: string;
    additionalInfo: string;
    createdBy: string;
    createdDateTime: number;
    updatedBy: string | null;
    updatedDateTime: number | null;
    deletedBy: string | null;
    deletedDateTime: number | null;
    images: string[];
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface ApiResponse {
    responseCode: string;
    statusCode: string;
    message: string;
    data: {
      content: BuildingDataItem[];
      pageable: Pageable;
      totalPages: number;
      totalElements: number;
      last: boolean;
      size: number;
      number: number;
      sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
      };
      numberOfElements: number;
      first: boolean;
      empty: boolean;
    };
  }
  


export default function useTableRuangan(fetchDatas: () => void, onSuccessDelete: () => void) {
    const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [datas, setDatas] = useState<RoomDataItem[]>([]);
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
      setDatas(result);
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
          dataIdBuilding.map((id) => axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/building/${id}`))
        );

        const facilitiesData = responses.map((response) => {
          const name = response.data.data.name;
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

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);



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
    datas,
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
