


import { useCallback, useEffect, useState } from "react";
import { Clinic } from "../../../services/Admin Tenant/ManageClinic/Clinic";
import { useLocation, useNavigate } from "react-router-dom";
import { ClinicDataItem } from "../../../types/clinic.types";

export const PAGE_SIZE = 10;

export default function useIndex() {
    const [data, setData] = useState<ClinicDataItem[]>([]);
    const [successAddClinic, setSuccessAddClinic] = useState(false);
    const [successDeleteClinic, setSuccessDeleteClinic] = useState(false);
    const [successEditClinic, setSuccessEditClinic] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(0);
    const [orderBy, setOrderBy] = useState("createdDateTime=asc");
    const [totalElements, setTotalElements] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();


    const fetchData = useCallback( async () => {
        setIsLoading(true)
        try {
            const result = await Clinic(pageNumber, PAGE_SIZE, orderBy);
            setTotalElements(result.data.totalElements);
            setData(result.data.content);
        } catch (error) {
            console.error('Failed to fetch data from API' + error);
        } finally {
            setIsLoading(false)
        }
    }, [pageNumber, orderBy]);


    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
      }, [location.state]);

    const showTemporaryAlertSuccess = async () => {
        setSuccessAddClinic(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessAddClinic(false);
    };

    const showTemporarySuccessDelete = async () => {
        setSuccessDeleteClinic(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessDeleteClinic(false);
    };

    const showTemporarySuccessEdit = async () => {
        setSuccessEditClinic(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setSuccessEditClinic(false);
    };
  return {
    data, 
    isLoading, 
    fetchData, 
    successAddClinic, 
    successDeleteClinic, 
    successEditClinic, 
    showTemporarySuccessDelete,
    setPageNumber,
    totalElements,
    setOrderBy
  }
}
