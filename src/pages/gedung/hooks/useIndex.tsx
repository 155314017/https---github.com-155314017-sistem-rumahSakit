/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Building } from "../../../services/Admin Tenant/ManageBuilding/Building";
import { BuildingDataItem } from "../../../types/building.types";

export const PAGE_SIZE = 10;

export default function useIndex() {
  const [data, setData] = useState<BuildingDataItem[]>([]);
  const [successAddBuilding, setSuccessAddBuilding] = useState(false);
  const [successDeleteBuilding, setSuccessDeleteBuilding] = useState(false);
  const [successEditBuilding, setSuccessEditBuilding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const [totalElements, setTotalElements] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await Building(pageNumber, PAGE_SIZE, orderBy);
      setTotalElements(result.data.totalElements);
      setData(result.data.content);
    } catch (error) {
      console.error('Failed to fetch data from API', error);
    } finally {
      setLoading(false);
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
    setSuccessAddBuilding(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAddBuilding(false);
  };

  const showTemporarySuccessDelete = async () => {
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
    fetchData,
    showTemporaryAlertSuccess,
    showTemporarySuccessDelete,
    showTemporarySuccessEdit,
    pageNumber,
    setPageNumber,
    orderBy,
    setOrderBy,
    totalElements,
    PAGE_SIZE
  }
}
