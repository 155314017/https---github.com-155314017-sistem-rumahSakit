import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AmbulanceServices
} from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'
import { AmbulanceDataItem } from '../../../types/ambulance.types'
  
export default function useIndex() {
  const [data, setData] = useState<AmbulanceDataItem[]>([])
  const [successAddAmbulance, setSuccessAddAmbulance] = useState(false)
  const [successDeleteAmbulance, setSuccessDeleteAmbulance] = useState(false)
  const [successEditAmbulance, setSuccessEditAmbulance] = useState(false)
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
      
      navigate(location.pathname, { replace: true, state: undefined }) 
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
   
    setSuccessAddAmbulance(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessAddAmbulance(false)
  }

  const showTemporarySuccessDelete = async () => {
    
    setSuccessDeleteAmbulance(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessDeleteAmbulance(false)
  }

  const showTemporarySuccessEdit = async () => {
    
    setSuccessEditAmbulance(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessEditAmbulance(false)
  }
  return {
    fetchData,
    data,
    successAddAmbulance,
    successDeleteAmbulance,
    successEditAmbulance,
    showTemporarySuccessDelete,
    
  }

    
  
}
