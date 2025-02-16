import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Building } from "../../../services/Admin Tenant/ManageBuilding/Building";
import { BuildingDataItem } from "../../../types/building.types";
import { useFetchData } from "../../../hooks/useFetchData";
import useDebounce from "../../../hooks/useDebounce"; 

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

  // useEffect(() => {
  //   refetch();
  // }, [pageNumber, orderBy, refetch]);

  // Menggunakan useDebounce untuk debounced searchItem
  const debouncedSearchItem = useDebounce(searchItem, 300); 

  useEffect(() => {
    if (debouncedSearchItem !== searchItem) {
      refetch();
    }
  }, [debouncedSearchItem, refetch, searchItem]);

  const handleSearchChange = (newSearchValue: string) => {
    setSearchItem(newSearchValue);
  };

  const [successAddBuilding, setSuccessAddBuilding] = useState(false);
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
  const [successEditBuilding, setSuccessEditBuilding] = useState(false);

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
    setSuccessAddBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAddBuilding(false);
  };

  const showTemporarySuccessDelete = async () => {
    refetch();
    setSuccessDeleteBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessDeleteBuilding(false);
  };

  const showTemporarySuccessEdit = async () => {
    setSuccessEditBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessEditBuilding(false);
  };

  return {
    data,
    successAddBuilding,
    successDeleteBuilding,
    successEditBuilding,
    loading,
    refetch,
    showTemporaryAlertSuccess,
    showTemporarySuccessDelete,
    showTemporarySuccessEdit,
    pageNumber,
    setPageNumber,
    orderBy,
    setOrderBy,
    totalElements,
    PAGE_SIZE,
    handleSearchChange,
    error,
  };
}
