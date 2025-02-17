
  import { useState } from "react";

  import DataPegawai from "../../../data/dummyData/dataPegawai";
  
  
  


export default function useTableAntrianPasien() {
    const datas = DataPegawai;

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedData = datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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

  const handleSelectionChange = (selectedValue: string) => {
    console.log("Selected Value:", selectedValue);
  };


  return {
    datas,
    displayedData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    sortir,
    urutkan,
    handleSelectionChange
  }
}
