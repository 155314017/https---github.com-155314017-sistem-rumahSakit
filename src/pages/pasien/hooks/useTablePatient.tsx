import React, { useState, useEffect } from "react";
import { PAGE_SIZE } from "./useIndex";
export default function useTablePatient(
  onSuccessDelete: () => void,
  setPageNumber: (page: number) => void,
  setOrderBy: (order: string) => void
) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [sort, setSort] = useState('');
  const [deletedItems, setDeletedItems] = useState("");
  const [open, setOpen] = useState(false)

  


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const responses = await Promise.all(
  //         dataIdUser.map((id) => axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/user/${id}`))
  //       );

  //       const userDataPhone = responses.map((response) => {
  //         const name = response.data.data.phone;
  //         return name ? name : "Data User Tidak Tercatat";
  //       });
  //       setUserDataPhone(userDataPhone);
  //     } catch (err) {
  //       console.error('Error:', err);
  //     }
  //   };

  //   if (dataIdUser.length > 0) {
  //     fetchUsers();
  //   }
  // }, [dataIdUser]);

  // useEffect(() => {
  //   const fetchClinics = async () => {
  //     try {
  //       const responses = await Promise.all(
  //         dataIdClinic.map((id) => axios.get(`${import.meta.env.VITE_APP_BACKEND_URL_BASE}/v1/manage/clinic/${id}`))
  //       );

  //       const CLinicData = responses.map((response) => {
  //         const name = response.data.data.name;
  //         return name ? name : "Data Gedung Tidak Tercatat";
  //       });
  //       setClinics(CLinicData);

  //     } catch (err) {
  //       console.error('Error:', err);
  //     }
  //   };

  //   if (dataIdClinic.length > 0) {
  //     fetchClinics();
  //   }
  // }, [dataIdClinic]);


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageNumber(value - 1)
  };

  

  const sortir = [
    { value: 1, label: "Pria" },
    { value: 2, label: "Wanita" },
  ];

  const urutkan = [
    { value: 1, label: "Nama Pasien A-Z" },
    { value: 2, label: "Nama Pasien Z-A" },
    { value: 3, label: "Nomor Pasien 1-9" },
    { value: 4, label: "Nomor Pasien 9-1" },
  ];

  useEffect(() => {
    if (sort === "Nama Pasien A-Z") {
      setOrderBy('name=asc');
    } else if (sort === "Nama Pasien Z-A") {
      setOrderBy('name=desc');
    } else if (sort === "Nomor Pasien 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort === "Nomor Pasien 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort, setOrderBy]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };
  const handleDeleteSuccess = () => {
    setOpen(false);
    onSuccessDelete();
  };



  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, patientId: string) => {
    event.preventDefault();
    setDeletedItems(patientId)
    setOpen(true);
  };
  return {
    page,
    isCollapsed,
    handleChangePage,
    sortir,
    urutkan,
    toggleCollapse,
    confirmationDelete,
    sort,
    setSort,
    setOpen,
    handleDeleteSuccess,
    deletedItems,
    open,
    pageSize : PAGE_SIZE
  }
}