/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "./useIndex";
import useConfirmationDelete from "../../../hooks/useConfirmationDelete";
export default function useTableKlinik(
  onSuccessDelete: () => void,
  setPageNumber: (page: number) => void,
  setOrderBy: (order: string) => void
) {
  const [page, setPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const [deletedItems, setDeletedItems] = useState<string | null>(null);
  const [sort, setSort] = useState('');

  const navigate = useNavigate();

  const { confirmationDelete } = useConfirmationDelete( setOpen, setDeletedItems);
  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageNumber(value - 1);
  };

  useEffect(() => {
    if (sort == "Nama klinik A-Z") {
      setOrderBy('name=asc');
    } else if (sort == "Nama klinik Z-A") {
      setOrderBy('name=desc');
    } else if (sort == "Nomor klinik 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort == "Nomor klinik 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort, setOrderBy])

  const urutkan = [
    { value: 1, label: "Nama Klinik A-Z" },
    { value: 2, label: "Nama Klinik Z-A" },
    { value: 3, label: "Nomor Klinik 1-9" },
    { value: 4, label: "Nomor Klinik 9-1" },
  ];
  
  const handleDeleteSuccess = () => {
    onSuccessDelete();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return {
    page,
    isCollapsed,
    open,
    setOpen,
    deletedItems,
    handleDeleteSuccess,
    handleChangePage,
    setDeletedItems,
    pageSize: PAGE_SIZE,
    urutkan,
    toggleCollapse,
    navigate,
    setSort,
    confirmationDelete,
    
  }
}
