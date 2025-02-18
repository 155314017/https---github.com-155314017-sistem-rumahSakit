


import {  useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClinicDataItem } from "../../../types/clinic.types";
import { useFetchData } from "../../../hooks/useFetchData";
import useDebounce from "../../../hooks/useDebounce";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";
import { Clinic } from "../../../services/Admin Tenant/ManageClinic/Clinic";

export const PAGE_SIZE = 10;

export default function useIndex() {
    const [pageNumber, setPageNumber] = useState(0);
    const [orderBy, setOrderBy] = useState("createdDateTime=asc");
    const [searchItem, setSearchItem] = useState("");
    const location = useLocation();
    const navigate = useNavigate();


    const { data, totalElements, loading, error, refetch } = useFetchData<ClinicDataItem[]>(
        Clinic,
        [pageNumber, PAGE_SIZE, orderBy, searchItem],
        false
      );


    const hasFetched = useRef(false);
      useEffect(() => {
        if (!hasFetched.current) {
          refetch();
          hasFetched.current = true;
        }
      }, [refetch]);


      const debouncedSearchItem = useDebounce(searchItem, 300);

      useEffect(() => {
        if (debouncedSearchItem !== searchItem) {
          refetch();
        }
      }, [debouncedSearchItem, refetch, searchItem]);


      const handleSearchChange = (newSearchValue: string) => {
        setSearchItem(newSearchValue);
      }

      const { isSuccess, message, showAlert } = useSuccessNotification();


    useEffect(() => {
        const handleLocationState = async () => {
          if (location.state) {
            if (location.state.successAdd) {
              await showAlert("Clinic added successfully! ")
            } else if (location.state.successEdit) {
              await showAlert("Clinic edited successfully!");
            } else if (location.state.successDelete) {
              await showAlert("Clinic deleted successfully! ");
            }
            navigate(location.pathname, { replace: true, state: undefined });
          }
        };
    
        handleLocationState();
      }, [location.state]);

    

    
  return {
    data,
    loading,
    refetch,
    pageNumber,
    setPageNumber,
    orderBy,
    setOrderBy,
    totalElements,
    PAGE_SIZE,
    handleSearchChange,
    error,
    isSuccess,
    message,
    fetchData: refetch,
    showAlert,
  }
}
