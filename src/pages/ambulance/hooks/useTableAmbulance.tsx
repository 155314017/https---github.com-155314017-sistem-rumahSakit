import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AmbulanceServices,
    AmbulanceDataItem
  } from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'


  interface UseTableAmbulanceReturn {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isCollapsed: boolean;
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    datas: AmbulanceDataItem[];
    setDatas: React.Dispatch<React.SetStateAction<AmbulanceDataItem[]>>;
    deletedItems: string;
    setDeletedItems: React.Dispatch<React.SetStateAction<string>>;
    navigate: ReturnType<typeof useNavigate>;
    fetchData: () => Promise<void>;
    handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
    rowsPerPage: number;
    displayedData: AmbulanceDataItem[];
   
    handleDeleteSuccess: () => void;
    toggleCollapse: () => void;
    confirmationDelete: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  }

export default function useTableAmbulance():UseTableAmbulanceReturn {
    const [page, setPage] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  // const [data, setData] = useState<AmbulanceDataItem[]>([]);
  const [datas, setDatas] = useState<AmbulanceDataItem[]>([])
  const [deletedItems, setDeletedItems] = useState('')

  const navigate = useNavigate()

  const fetchData = async () => {
   
    try {
      const result = await AmbulanceServices()
     
      setDatas(result)
      // setData(result); // Set data to display in table
    } catch (error) {
      console.error('Failed to fetch data from API' + error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const rowsPerPage = 10

  const displayedData = datas.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  

  const handleDeleteSuccess = () => {
   
    fetchData()
  }

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault()

   
    setDeletedItems(buildingId)

    setOpen(true)
  }

  return {
    page,
    setPage,
    isCollapsed,
    setIsCollapsed,
    open,
    setOpen,
    datas,
    setDatas,
    deletedItems,
    setDeletedItems,
    navigate,
    fetchData,
    handleChangePage,
    rowsPerPage,
    displayedData,

    handleDeleteSuccess,
    toggleCollapse,
    confirmationDelete

  }
    
  
}
