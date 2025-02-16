import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AmbulanceServices
} from '../../../services/Admin Tenant/ManageAmbulance/AmbulanceServices'
import { AmbulanceDataItem } from '../../../types/ambulance.types'
import { useFetchData } from '../../../hooks/useFetchData';

export const PAGE_SIZE = 10;

export default function useIndex() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  // const [searchItem, setSearchItem] = useState("");
  const [successAddAmbulance, setSuccessAddAmbulance] = useState(false)
  const [successDeleteAmbulance, setSuccessDeleteAmbulance] = useState(false)
  const [successEditAmbulance, setSuccessEditAmbulance] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const { data, totalElements, loading, error, refetch } = useFetchData<AmbulanceDataItem[]>(
    AmbulanceServices,
    [pageNumber, PAGE_SIZE, orderBy],
    false
  );

  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      refetch();
      hasFetched.current = true;
    }
  }, [refetch]);


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
        // refetch();
      }
    };

    handleLocationState();
  }, [location.state]);




  const showTemporaryAlertSuccess = async () => {

    setSuccessAddAmbulance(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setSuccessAddAmbulance(false)
  }

  const showTemporarySuccessDelete = async () => {
    refetch();
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
    error,
    loading

  }



}
