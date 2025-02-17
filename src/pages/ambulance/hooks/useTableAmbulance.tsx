/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useConfirmationDelete from '../../../hooks/useConfirmationDelete';



export const PAGE_SIZE = 10;


export default function useTableAmbulance(
  onSuccessDelete: () => void,
  setPageNumber: (page: number) => void,
  setOrderBy: (order: string) => void
) {
  const [page, setPage] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  const [deletedItems, setDeletedItems] = useState<string | null>("");
  const [sort, setSort] = useState('')

  const navigate = useNavigate()

  const { confirmationDelete } = useConfirmationDelete( setOpen, setDeletedItems);

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    setPageNumber(value - 1)
  }

  


  
  useEffect(() => {
    if (sort === "Nama Ambulance A-Z") {
      setOrderBy('name=asc');
    } else if (sort === "Nama Ambulance Z-A") {
      setOrderBy('name=desc');
    } else if (sort === "Nomor Ambulance 1-9") {
      setOrderBy('createdDateTime=asc');
    } else if (sort === "Nomor Ambulance 9-1") {
      setOrderBy('createdDateTime=desc');
    }
  }, [sort, setOrderBy]);
  

  

  const handleDeleteSuccess = () => {
    onSuccessDelete()
    onSuccessDelete()
  }



  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  

  return {
    page,
    isCollapsed,
    open,
    setOpen,
    deletedItems,
    navigate,
    handleChangePage,
    handleDeleteSuccess,
    toggleCollapse,
    confirmationDelete,
    pageSize: PAGE_SIZE,
    setSort,
    sort

  }


}
