import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building } from "../../../services/Admin Tenant/ManageBuilding/Building";
import { BuildingDataItem } from "../../../types/building.types";
import { useFetchData } from "../../../hooks/useFetchData";
import useDebounce from "../../../hooks/useDebounce";
import { useSuccessNotification } from "../../../hooks/useSuccessNotification";

export const PAGE_SIZE = 10;

export default function useIndex() {
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const [searchItem, setSearchItem] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { data, totalElements, loading, error, refetch } = useFetchData<BuildingDataItem[]>(
    Building,
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
  };

  // membuat notif aler menggunakan useSuccessNotification 
  const { isSuccess, message, showTemporarySuccess } = useSuccessNotification();

  useEffect(() => {
    const handleLocationState = async () => {
      if (location.state) {
        if (location.state.successAdd) {
          await showTemporarySuccess("Building added successfully! ");
        } else if (location.state.successEdit) {
          await showTemporarySuccess("Building edited successfully!");
        } else if (location.state.successDelete) {
          await showTemporarySuccess("Building deleted successfully! 3");
        }
        navigate(location.pathname, { replace: true, state: undefined });
      }
    };

    handleLocationState();
  }, [location.state, navigate, showTemporarySuccess]);

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
    showTemporarySuccess,
  };
}
