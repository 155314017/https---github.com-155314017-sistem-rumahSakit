import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
    AmbulanceServices,
    AmbulanceDataItem
  } from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'
  
export default function useIndex() {
  const [data, setData] = useState<AmbulanceDataItem[]>([])
  const [successAddBuilding, setSuccessAddBuilding] = useState(false)
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false)
  const [successEditBuilding, setSuccessEditBuilding] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const fetchData = async () => {
    
    try {
      const result = await AmbulanceServices()
     
      setData(result)
    } catch (error) {
      console.error('Failed to fetch data from API' + error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (location.state && location.state.successAdd) {
      showTemporaryAlertSuccess()
      
      navigate(location.pathname, { replace: true, state: undefined }) //clear state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate])

  useEffect(() => {
    if (location.state && location.state.successEdit) {
      showTemporarySuccessEdit()
     
      navigate(location.pathname, { replace: true, state: undefined }) //clear state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, navigate])

  const showTemporaryAlertSuccess = async () => {
   
    setSuccessAddBuilding(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessAddBuilding(false)
  }

  const showTemporarySuccessDelete = async () => {
    
    setSuccessDeleteBuilding(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteBuilding(false)
  }

  const showTemporarySuccessEdit = async () => {
    
    setSuccessEditBuilding(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessEditBuilding(false)
  }
  return {
    fetchData,
    data,
    successAddBuilding,
    successDeleteBuilding,
    successEditBuilding,
    showTemporarySuccessDelete,
    
  }

    
  
}
