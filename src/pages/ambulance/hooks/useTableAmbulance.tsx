import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AmbulanceServices,
    AmbulanceDataItem
  } from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'



 

export default function useTableAmbulance(fetchDatas: () => void, onSuccessDelete: () => void) {
  const [page, setPage] = useState(1)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [open, setOpen] = useState(false)
  // const [data, setData] = useState<AmbulanceDataItem[]>([]);
  const [datas, setDatas] = useState<AmbulanceDataItem[]>([])
  const [deletedItems, setDeletedItems] = useState('')

  const navigate = useNavigate()

  const fetchData = async () => {
    console.log('Fetching data...')
    try {
      const result = await AmbulanceServices()
      console.log('Result: ', result)
      setDatas(result)
      // setData(result); // Set data to display in table
    } catch (error) {
      console.log('Failed to fetch data from API: ', error)
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

  const handleSelectionChange = (selectedValue: string) => {
    console.log('Selected Value:', selectedValue)
  }

  const handleDeleteSuccess = () => {
    onSuccessDelete()
    fetchDatas()
    fetchData()
  }

  

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev)
  }

  const confirmationDelete = (event: React.MouseEvent<HTMLAnchorElement>, buildingId: string) => {
    event.preventDefault()

    console.log('ID Gedung yang akan dihapus:', buildingId)
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
    handleSelectionChange,
    handleDeleteSuccess,
    toggleCollapse,
    confirmationDelete,
    onDeleteSuccess: handleDeleteSuccess

  }
    
  
}
