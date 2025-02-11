import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AmbulanceServices
} from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'
import { AmbulanceDataItem } from '../../../types/ambulance.types'

export const PAGE_SIZE = 10;
  
export default function useIndex() {
  const [data, setData] = useState<AmbulanceDataItem[]>([])
  const [successAddAmbulance, setSuccessAddAmbulance] = useState(false)
  const [successDeleteAmbulance, setSuccessDeleteAmbulance] = useState(false)
  const [successEditAmbulance, setSuccessEditAmbulance] = useState(false)
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    
    try {
      const result = await AmbulanceServices()
     
      setData(result)
    } catch (error) {
      console.error('Failed to fetch data from API' + error)
    } finally {
      setLoading(false)
    }
  }, [pageNumber, orderBy])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const handleLocationState = async () => {
      if (location.state) {
        if (location.state.successAdd) {
          await showTemporaryAlertSuccess();
        } else if (location.state.successEdit) {
          await showTemporarySuccessEdit();
        } else if (location.state.successDelete) {
          await showTemporarySuccessDelete();
        }
        navigate(location.pathname, { replace: true, state: undefined });
        fetchData();
      }
    };

    handleLocationState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  

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
    data,
    successAddAmbulance,
    successDeleteAmbulance,
    successEditAmbulance,
    showTemporarySuccessDelete,
    setPageNumber,
    setOrderBy,
    totalElements,
    setTotalElements,
    loading
    
  }

    
  
}
