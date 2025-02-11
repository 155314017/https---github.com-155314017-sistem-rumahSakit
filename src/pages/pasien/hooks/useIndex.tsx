import { useCallback, useEffect, useState } from "react";


// icon
import { PatientServices } from '../../../services/ManagePatient/PatientServices';
import { useLocation, useNavigate } from "react-router-dom";
import { PatientDataItem } from "../../../types/patient.types";


export const PAGE_SIZE = 10;
export default function useIndex() {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<PatientDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [orderBy, setOrderBy] = useState("createdDateTime=asc");
  const [totalElements, setTotalElements] = useState(0);
  const [successAddPatient, setSuccessAddPatient] = useState(false);
  const [successDeletePatient, setSuccessDeletePatient] = useState(false);
  const [successEditPatient, setSuccessEditPatient] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await PatientServices(pageNumber, PAGE_SIZE, orderBy);
      setTotalElements(result.data.totalElements)
      setData(result.data.content);
    } catch (error) {
      console.error('Failed to fetch data from API' + error);
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
    setSuccessAddPatient(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessAddPatient(false);
  };

  const showTemporarySuccessDelete = async () => {
    setSuccessDeletePatient(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessDeletePatient(false);
  };

  const showTemporarySuccessEdit = async () => {
    setSuccessEditPatient(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccessEditPatient(false);
  };

  return {
    data,
    open,
    setOpen,
    successAddPatient,
    setSuccessAddPatient,
    successDeletePatient,
    setSuccessDeletePatient,
    successEditPatient,
    loading,
    setPageNumber,
    setOrderBy,
    totalElements,
    setTotalElements,
    showTemporarySuccessDelete

  }
}
