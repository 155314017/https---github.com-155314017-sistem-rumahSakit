/* eslint-disable react-hooks/exhaustive-deps */
import { CounterServices } from "../../../services/Admin Tenant/ManageCounter/CounterServices";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CounterDataItem } from "../../../types/counter.types";
import { useFetchData } from "../../../hooks/useFetchData";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";

export const PAGE_SIZE = 10;
export default function useIndex() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const location = useLocation();
  const navigate = useNavigate();

  const { data, totalElements, loading, refetch } = useFetchData<CounterDataItem[]>(
    CounterServices,
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

  const { isSuccess, message, showAlert } = useSuccessNotification();
  useEffect(() => {
    const handleLocationState = async () => {
      if (location.state) {
        if (location.state.successAdd) {
          await showAlert("Counter added successfully! ");
        } else if (location.state.successEdit) {
          await showAlert("Counter edited successfully!");
        } else if (location.state.successDelete) {
          await showAlert("Counter deleted successfully!");
        }
        navigate(location.pathname, { replace: true, state: undefined });
      }
    };

    handleLocationState();
  }, [location.pathname, location.state, navigate, showAlert]);

  return {
    data,
    loading,
    pageNumber,
    setPageNumber,
    orderBy,
    setOrderBy,
    totalElements,
    PAGE_SIZE,
    message,
    isSuccess,
    showAlert,
    refetch
  }
}
