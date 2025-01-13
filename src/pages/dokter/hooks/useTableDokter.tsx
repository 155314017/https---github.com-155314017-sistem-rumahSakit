import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { DoctorDataItem, DoctorServices } from "../../../services/Admin Tenant/ManageDoctor/DoctorServices";
import { GetDoctorServices } from "../../../services/Admin Tenant/ManageDoctor/GetDoctorService";
export default function useTableDokter() {
    const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [datas, setDatas] = useState<DoctorDataItem[]>([]);
  const [idClinic, setIdClinic] = useState<string[]>([]);
  const [clinicNames, setClinicNames] = useState<string[]>([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await DoctorServices();
        setDatas(result);
        const clinicId = result.map((data) => data.parentClinicId);
        setIdClinic(clinicId)
      } catch (error) {
        console.log('Failed to fetch data from API: ', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchClinicNames = async () => {
      try {
        const names = await Promise.all(
          idClinic.map(async (id) => {
            const response = await GetDoctorServices(id);
            return response.name; 
          })
        );
        setClinicNames(names);
      } catch (error) {
        console.log('Failed to fetch clinic names: ', error);
      }
    };

    if (idClinic.length > 0) {
      fetchClinicNames();
    }
  }, [idClinic]);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const rowsPerPage = 10;
  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const sortir = [
    { value: 1, label: "Dokter Spesialis" },
    { value: 2, label: "Dokter Umum" },
  ];

  const urutkan = [
    { value: 1, label: "Biaya penanganan tertinggi" },
    { value: 2, label: "Biaya penanganan terendah" },
    { value: 3, label: "Nama dokter A-Z" },
    { value: 4, label: "Nama dokter Z-A" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return {
    page,
    setPage,
    isCollapsed,
    setIsCollapsed,
    datas,
    setDatas,
    idClinic,
    setIdClinic,
    clinicNames,
    setClinicNames,
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
